"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { Badge } from "../../shared/Badge";
import Button from "../../shared/Button";
import { Input } from "../../shared/Input";

import { formatPrice } from "@/lib/utils";
import { PriceProps } from "@/types";

const Price = ({
  totalPrice,
  discountedPrice,
  setDiscountedPrice,
  coupon,
  setCoupon,
}: PriceProps) => {
  const [couponError, setCouponError] = useState<string>();
  const couponInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const finalPrice =
      coupon.discountPercentage > 0
        ? totalPrice - (totalPrice * coupon.discountPercentage) / 100
        : totalPrice;

    setDiscountedPrice(finalPrice);
  }, [totalPrice, coupon.discountPercentage, setDiscountedPrice]);

  const checkCouponValidity = async () => {
    const code = couponInputRef.current?.value;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/validate-promo-code/${code}`,
        {
          method: "POST",
          headers: { "x-authentication-token": "borealis-fe-interview-token" },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setCouponError("");
        setCoupon({
          ...data,
          showInput: true,
        });
        couponInputRef!.current!.value = ""; // Reset input value
      } else {
        setCouponError(data.cause);
      }
    } catch (error) {
      console.log(error);
      toast.error("Nešto je pošlo po krivu. Molimo pokušajte ponovo.");
    }
  };

  const handleCouponRemove = () => {
    setCoupon((prev) => ({
      ...prev,
      id: "",
      code: "",
      discountPercentage: 0,
    }));
    setDiscountedPrice(totalPrice);
  };

  return (
    <div className="bg-light-200 flex justify-between py-2.5 px-[15px]">
      <div className="flex gap-2.5">
        <h4 className="h4-regular">ukupno: </h4>
        <h4 className="h4-bold text-primary-100">
          {formatPrice(discountedPrice)}
        </h4>
      </div>
      {coupon.showInput ? (
        <div>
          <div className="flex gap-[10px]">
            <Input
              ref={couponInputRef}
              className="w-[155px]"
              placeholder="Unesi kod"
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
          {couponError !== "" && (
            <div className="validation-error">{couponError}</div>
          )}
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
            setCoupon((prevCoupon) => ({
              ...prevCoupon,
              showInput: true,
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
