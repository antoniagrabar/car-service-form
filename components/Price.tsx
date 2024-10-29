"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Badge } from "./shared/Badge";
import Button from "./shared/Button";
import { Input } from "./shared/Input";

import { PriceProps, Coupon, CouponInput } from "@/types";

const Price = ({ totalPrice }: PriceProps) => {
  const [couponInput, setCouponInput] = useState<CouponInput>({
    show: false,
    code: "",
    errorCause: "",
  });
  const [coupon, setCoupon] = useState<Coupon>({
    id: "",
    code: "",
    discountPercentage: 0,
  });
  const [discountedPrice, setDiscountedPrice] = useState<number>(totalPrice);

  useEffect(() => {
    const finalPrice =
      coupon.discountPercentage > 0
        ? totalPrice - (totalPrice * coupon.discountPercentage) / 100
        : totalPrice;
    setDiscountedPrice(finalPrice);
  }, [totalPrice, coupon.discountPercentage]);

  const checkCouponValidity = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/validate-promo-code/${couponInput.code}`,
        {
          method: "POST",
          headers: { "x-authentication-token": "borealis-fe-interview-token" },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setCoupon(data);
        setCouponInput((prevCoupon) => ({
          ...prevCoupon,
          code: "",
          errorCause: "",
        }));
      } else {
        setCouponInput((prevCoupon) => ({
          ...prevCoupon,
          errorCause: data.cause,
        }));
      }
    } catch (error) {
      console.log(error);
      toast.error("Nešto je pošlo po krivu. Molimo pokušajte ponovo.");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCouponInput((prevCoupon) => ({
      ...prevCoupon,
      code: e.target.value,
    }));
  };

  const handleCouponRemove = () => {
    setCoupon({
      id: "",
      code: "",
      discountPercentage: 0,
    });
    setDiscountedPrice(totalPrice);
  };

  return (
    <div className="bg-light-200 flex justify-between py-2.5 px-[15px]">
      <div className="flex gap-2.5">
        <h4 className="h4-regular">ukupno: </h4>
        <h4 className="h4-bold text-primary-100">
          {discountedPrice.toFixed(2)}€
        </h4>
      </div>
      {couponInput.show ? (
        <div>
          <div className="flex gap-[10px]">
            <Input
              value={couponInput.code}
              className="w-[155px]"
              placeholder="Unesi kod"
              onChange={(e) => handleInputChange(e)}
            />
            <Button size="sm" onClick={() => checkCouponValidity()}>
              <Image
                src={"/vectors/check-icon-2.svg"}
                width={24}
                height={24}
                alt="check-icon-coupon"
              />
            </Button>
          </div>
          <div className="validation-error">{couponInput.errorCause}</div>
          {coupon && coupon.code !== "" && (
            <Badge
              key={coupon.id}
              className="flex gap-[5px] pr-[5px] mt-[10px]"
              onClick={() => handleCouponRemove()}
            >
              <h6 className="h6-regular">{coupon?.code}</h6>
              <Image
                src={"/vectors/close-icon.svg"}
                width={20}
                height={20}
                alt="close-icon"
                className="cursor-pointer"
              />
            </Badge>
          )}
        </div>
      ) : (
        <h5
          className="h5-regular text-primary-100 cursor-pointer"
          onClick={() =>
            setCouponInput((prevCoupon) => ({
              ...prevCoupon,
              show: true,
            }))
          }
        >
          Imam kupon
        </h5>
      )}
    </div>
  );
};

export default Price;
