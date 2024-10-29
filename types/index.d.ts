import React from "react";

export type ButtonVariant = "primary" | "secondary";

export type ButtonSize = "default" | "sm";

export interface ButtonOptions {
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

export interface RadioGroupProps {
  disabled?: boolean;
  name: string;
  onChange: (value: string) => void;
  options: RadioOptionType[];
  containerClasses?: string;
}

export interface RadioProps {
  id: string;
  label: string;
  disabled?: boolean;
  name?: string;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
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

export interface FormData {
  manufacturerId: string;
  serviceIds: string[];
  promoCode?: string;
  name: string;
  email: string;
  phone: string;
  note?: string;
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
  name: string[];
  email: string[];
  phone: string[];
  note: string[];
}

export interface PriceProps {
  totalPrice: number;
}

export type Coupon = {
  id: string;
  code: string;
  discountPercentage: number;
};

export type CouponInput = {
  show: boolean;
  code: string;
  errorMessage?: string;
  errorCause?: string;
};
