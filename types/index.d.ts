export type ButtonVariant = "primary" | "secondary" | "tertiary";

type ButtonSize = "big" | "small";

export type ButtonOptions = {
  label?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export type Ref = HTMLButtonElement;

export type Manufacturer = {
  id: string;
  name: string;
};

export type Service = {
  id: string;
  name: string;
  price: number;
};

export type ServiceFormValidationErrors = {
  manufacturerId: string[];
  serviceIds: string[];
  fullName: string[];
  email: string[];
  phoneNumber: string[];
  note: string[];
};

export type Coupon = {
  id: string;
  code: string;
  discountPercentage: number;
  showInput: boolean;
};

export type CouponInput = {
  code: string;
  errorMessage?: string;
  errorCause?: string;
};

export type FormValues = {
  manufacturerId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  note?: string;
};
