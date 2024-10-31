import { ServiceFormValidationErrors, FormData, Coupon } from "@/types";

export const initialValidationErrors: ServiceFormValidationErrors = {
  manufacturerId: [],
  serviceIds: [],
  fullName: [],
  email: [],
  phoneNumber: [],
};

export const initialFormData: FormData = {
  manufacturerId: "",
  serviceIds: [],
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
