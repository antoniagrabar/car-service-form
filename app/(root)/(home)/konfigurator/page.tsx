import ServiceForm from "@/components/forms/serviceForm/ServiceForm";
import { getManufacturers, getServices } from "@/lib/actions";

const page = async () => {
  const manufacturers = await getManufacturers();
  const services = await getServices();

  return (
    <div className="flex items-center justify-center">
      <ServiceForm manufacturers={manufacturers} services={services} />
    </div>
  );
};

export default page;
