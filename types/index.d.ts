import React, { Dispatch, SetStateAction } from "react";

export type ButtonVariant = "primary" | "secondary" | "tertiary";

export type ButtonSize = "big" | "small";

export interface ButtonOptions {
  label?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export type Ref = HTMLButtonElement;

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonOptions;

export type Manufacturer = {
  id: string;
  name: string;
};

export type Service = {
  id: string;
  name: string;
  price: number;
};

export interface ServiceFormProps {
  manufacturers: Manufacturer[];
  services: Service[];
}

type RadioOptionType = {
  value: string;
  label: string;
};

export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  disabled?: boolean;
  name?: string;
  value?: string;
}

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  price?: number;
  disabled?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  label?: string;
  className?: string;
}

export interface ServiceFormValidationErrors {
  manufacturerId: string[];
  serviceIds: string[];
  fullName: string[];
  email: string[];
  phoneNumber: string[];
  note: string[];
}

export type Coupon = {
  id: string;
  code: string;
  discountPercentage: number;
  showInput: boolean;
};

export interface PriceProps {
  totalPrice: number;
  discountedPrice: number;
  setDiscountedPrice: (value: number) => void;
  coupon: Coupon;
  setCoupon: Dispatch<SetStateAction<Coupon>>;
}

export type CouponInput = {
  code: string;
  errorMessage?: string;
  errorCause?: string;
};

export interface FormValues {
  manufacturerId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  note?: string;
}

export interface ReviewProps {
  formValues: FormValues;
  manufacturerName: string;
  services: Service[];
  serviceIds: string[];
  promoCode: string;
  discountPercentage: number;
  discountedPrice: number;
  totalPrice: number;
  setShowReview: Dispatch<SetStateAction<boolean>>;
}

export interface GetManufacturerNameProps {
  manufacturers: Manufacturer[];
  id: string;
}
