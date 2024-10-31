import Image from "next/image";

const Success = () => {
  return (
    <div className="m-auto flex items-center justify-center max-2xl:h-[calc(100vh-120px)]">
      <div className="flex w-full sm:w-[540px] text-center flex-col items-center justify-center 2xl:pt-[314px]">
        <Image
          className="mb-5"
          src="/vectors/success-envelope.svg"
          alt="success-envelope"
          width={60}
          height={60}
        />
        <h2 className="h2-bold text-primary-100 mb-[15px]">
          Vaša prijava je uspješno poslana
        </h2>
        <h4 className="h4-regular text-base-100 text-center">
          Vaša prijava je uspješno poslana i zaprimljena. Kontaktirat ćemo vas u
          najkraćem mogućem roku. <br />
          Hvala vam!
        </h4>
      </div>
    </div>
  );
};

export default Success;
