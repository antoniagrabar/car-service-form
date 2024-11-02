"use client";

import Button from "@/components/shared/Button";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: Props) => (
  <div className="m-auto flex items-center justify-center h-[100vh]">
    <div className="flex flex-col gap-[20px] sm:w-[540px]">
      <h2 className="h2-bold">Nešto je pošlo po krivu.</h2>
      <h4 className="h4-regular">Dogodila se pogreška: {error.message}</h4>
      <Button onClick={reset} label="Pokušajte ponovo" />
    </div>
  </div>
);

export default Error;
