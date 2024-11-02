import ServiceForm from "@/components/forms/serviceForm/ServiceForm";
import { fetchData } from "@/lib/actions";

const Konfigurator = async () => {
  const [manufacturers, services] = await Promise.all([
    fetchData("manufacturers"),
    fetchData("services"),
  ]);

  return (
    <div className="flex items-center justify-center">
      <ServiceForm manufacturers={manufacturers} services={services} />
    </div>
  );
};

export default Konfigurator;
