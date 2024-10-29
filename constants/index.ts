import { ServiceFormValidationErrors, FormData, Coupon } from "@/types";

export const initialValidationErrors: ServiceFormValidationErrors = {
  manufacturerId: [],
  serviceIds: [],
  name: [],
  email: [],
  phone: [],
};

export const initialFormData: FormData = {
  manufacturerId: "",
  serviceIds: [],
  promoCode: "",
  name: "",
  email: "",
  phone: "",
  note: "",
};

export const initialCouponData: Coupon = {
  id: "",
  code: "",
  discountPercentage: 0,
  showInput: false,
};
