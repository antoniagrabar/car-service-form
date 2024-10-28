import ServiceForm from "@/components/forms/ServiceForm";
import { getManufacturers, getServices } from "@/lib/actions";

const page = async () => {
  const manufacturers = await getManufacturers();
  const services = await getServices();

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-5 pt-[40px] px-[30px] pb-5 w-[600px]">
        <h2 className="h2-bold text-base-100">Konfigurator Servisa</h2>
        <ServiceForm manufacturers={manufacturers} services={services} />
      </div>
    </div>
  );
};

export default page;
