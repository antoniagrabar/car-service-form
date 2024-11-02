"use client";

import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Badge from "@/components/shared/Badge";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { fetchData } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";
import { Coupon } from "@/types";

interface Props {
  totalPrice: number;
  discountedPrice: number;
  setDiscountedPrice: (value: number) => void;
  coupon: Coupon;
  setCoupon: Dispatch<SetStateAction<Coupon>>;
}

const Price = ({
  totalPrice,
  discountedPrice,
  setDiscountedPrice,
  coupon,
  setCoupon,
}: Props) => {
  const [couponError, setCouponError] = useState<string>();
  const couponInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const finalPrice =
      coupon.discountPercentage > 0
        ? totalPrice - (totalPrice * coupon.discountPercentage) / 100
        : totalPrice;

    setDiscountedPrice(finalPrice);
  }, [totalPrice, coupon.discountPercentage, setDiscountedPrice]);

  const checkCouponValidity = useCallback(async () => {
    const code = couponInputRef.current?.value;

    const data = await fetchData(`validate-promo-code/${code}`, "POST");

    if (data.message) {
      setCouponError(data.message);
    } else {
      setCouponError("");
      setCoupon({
        ...data,
        showInput: true,
      });
      couponInputRef!.current!.value = "";
    }
  }, [setCoupon]);

  const handleCouponRemove = useCallback(() => {
    setCoupon((prev) => ({
      ...prev,
      id: "",
      code: "",
      discountPercentage: 0,
    }));
    setDiscountedPrice(totalPrice);
  }, [setCoupon, setDiscountedPrice, totalPrice]);

  const handleShowInput = useCallback(() => {
    setCoupon((prevCoupon) => ({
      ...prevCoupon,
      showInput: true,
    }));
  }, [setCoupon]);

  return (
    <div className="bg-bg-200 flex justify-between py-2.5 px-[15px]">
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
              className={`${couponError ? "border-error" : ""} w-[155px]`}
              placeholder="Unesi kod"
            />
            <Button className="px-[5px]" onClick={checkCouponValidity}>
              <Image
                src={"/vectors/check-icon-2.svg"}
                width={24}
                height={24}
                alt="check-icon-coupon"
              />
            </Button>
          </div>
          {couponError && <div className="validation-error">{couponError}</div>}
          {coupon.code && (
            <Badge
              key={coupon.id}
              className="flex gap-[5px] pr-[5px] mt-[10px]"
              onClick={handleCouponRemove}
            >
              <h6 className="h6-regular">{coupon.code}</h6>
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
          onClick={handleShowInput}
        >
          Imam kupon
        </h5>
      )}
    </div>
  );
};

export default Price;
