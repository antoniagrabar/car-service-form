import Image from "next/image";
import Link from "next/link";

import Button from "@/components/shared/Button";
import ROUTES from "@/constants/routes";

const Home = () => {
  return (
    <div className="m-auto flex items-center justify-center max-2xl:h-[calc(100vh-120px)]">
      <div className="flex w-[600px] flex-col items-center justify-center gap-5 2xl:pt-[314px]">
        <Image
          src="/vectors/tools-and-utensils.svg"
          alt="tools-and-utensils"
          width={60}
          height={60}
        />
        <h2 className="h2-bold text-primary-100">Konfigurator servisa</h2>
        <h4 className="h4-regular text-base-100 text-center">
          Pošaljite upit za servis svog vozila pomoću našeg konfiguratora i naš
          stručan tim će vam se javiti u najkraćem mogućem roku.
        </h4>
        <Link href={ROUTES.KONFIGURATOR}>
          <Button label="Pokreni konfigurator" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
