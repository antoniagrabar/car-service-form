"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col gap-[20px]">
          <h2 className="h2-bold">Nešto je pošlo po krivu.</h2>
          <h4 className="h4-regular">Dogodila se pogreška: {error.message}</h4>
          <button onClick={() => reset()}>Pokušajte ponovo</button>
        </div>
      </body>
    </html>
  );
}
