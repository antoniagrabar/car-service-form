import React from "react";

import Button from "./shared/Button";

import { formatPrice } from "@/lib/utils";
import { ReviewProps } from "@/types";

const Review = ({
  formValues,
  manufacturerName,
  services,
  serviceIds,
  discountedPrice,
  discountPercentage,
  totalPrice,
  promoCode,
  setShowReview,
  handleSubmit,
}: ReviewProps) => {
  const contactFields = [
    { label: "Ime i prezime:", value: formValues.fullName },
    { label: "Email adresa:", value: formValues.email },
    { label: "Broj telefona:", value: formValues.phoneNumber },
    { label: "Napomena:", value: formValues.note },
  ];

  return (
    <>
      <div>
        <h4 className="h4-bold text-primary-100 mb-[10px]">
          Pregled i potvrda vašeg odabira
        </h4>
        <h5 className="h5-regular text-base-100">
          Molimo vas da još jednom pregledate i potvrdite podatke. Ukoliko
          želite promijeniti neki od podataka, vratite se na prethodni korak.
          Kada ste provjerili ispravnost svojih podataka, za slanje upita na
          servis pritisnite gumb “Pošalji”.
        </h5>
      </div>
      <div className="bg-light-200 p-5 rounded-md flex flex-col gap-[15px]">
        <div className="flex flex-col gap-[5px]">
          <h4 className="h4-bold text-primary-100">Model vozila</h4>
          <h5 className="h5-regular text-base-100">{manufacturerName}</h5>
        </div>
        <div className="flex flex-col gap-[5px]">
          <h4 className="h4-bold text-primary-100">Odabrane usluge</h4>
          {services.map(
            (service) =>
              serviceIds.includes(service.id) && (
                <div
                  key={service.id}
                  className="flex justify-between p-[5px] border-b border-base-400"
                >
                  <h5 className="h5-regular text-base-100">{service.name}</h5>
                  <h5 className="h5-regular text-base-100">
                    {formatPrice(service.price)}
                  </h5>
                </div>
              )
          )}
          {promoCode ? (
            <div className="flex justify-end gap-[20px] pt-[5px] px-[5px]">
              <h5 className="h5-regular text-base-200">
                Popust {discountPercentage}%:
              </h5>
              <h5 className="h5-regular text-base-100">
                -{formatPrice(totalPrice - discountedPrice)}
              </h5>
            </div>
          ) : (
            <></>
          )}
          <div className="flex justify-end gap-[20px] pt-[5px] px-[5px]">
            <h5 className="h5-regular text-base-200">Ukupno:</h5>
            <h5 className="h5-medium text-primary-100">
              {formatPrice(discountedPrice)}
            </h5>
          </div>
        </div>
        <div>
          <h4 className="h4-bold text-primary-100 mb-[5px]">Kontakt podaci</h4>
          <div className="flex flex-col gap-[3px]">
            {contactFields.map((field, index) => (
              <div key={index} className="flex">
                <h5 className="h5-regular text-base-200 w-[110px]">
                  {field.label}
                </h5>
                <h5 className="h5-regular text-base-100">{field.value}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-[20px] w-full">
        <Button
          variant="secondary"
          onClick={() => {
            setShowReview(false);
          }}
        >
          <h4 className="h4-regular text-base-100">Nazad</h4>
        </Button>
        <Button className="w-full" onClick={() => handleSubmit()}>
          <h4 className="h4-regular text-base-600">Pošalji</h4>
        </Button>
      </div>
    </>
  );
};

export default Review;
