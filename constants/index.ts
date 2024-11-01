import { ServiceFormValidationErrors, Coupon, FormValues } from "@/types";

export const initialValidationErrors: ServiceFormValidationErrors = {
  manufacturerId: [],
  serviceIds: [],
  fullName: [],
  email: [],
  phoneNumber: [],
  note: [],
};

export const defaultFormValues: FormValues = {
  manufacturerId: "",
  fullName: "",
  email: "",
  phoneNumber: "",
  note: "",
};

export const initialCouponData: Coupon = {
  id: "",
  code: "",
  discountPercentage: 0,
  showInput: false,
};
