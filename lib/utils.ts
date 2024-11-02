import { GetManufacturerNameProps } from "@/types";

export const getManufacturerName = ({
  manufacturers,
  id,
}: GetManufacturerNameProps) =>
  manufacturers.find((m) => m.id === id)?.name ?? "";

export const formatPrice = (price: number = 0) => {
  return `${price.toLocaleString("hr-HR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
};
