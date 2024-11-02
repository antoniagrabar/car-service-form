import ServiceForm from "@/components/forms/serviceForm/ServiceForm";
import { fetchData } from "@/lib/actions";

const Konfigurator = async () => {
  const [manufacturers, services] = await Promise.all([
    fetchData("manufacturers"),
    fetchData("services"),
  ]);

  if (manufacturers.message || services.message) {
    return <h4 className="h4-regular text-center">Nema podataka</h4>;
  }

  return (
    <div className="flex items-center justify-center">
      <ServiceForm manufacturers={manufacturers} services={services} />
    </div>
  );
};

export default Konfigurator;
