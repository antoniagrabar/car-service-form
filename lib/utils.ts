import { GetManufacturerNameProps } from "@/types";

export const getManufacturerName = ({
  manufacturers,
  id,
}: GetManufacturerNameProps) => {
  const name =
    manufacturers.find((manufacturer) => manufacturer.id === id)?.name || "";
  return name;
};

export const formatPrice = (price: number) => {
  return `${price.toLocaleString("hr-HR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
};
