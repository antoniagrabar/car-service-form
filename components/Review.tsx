import React from "react";

import Button from "./shared/Button";

import { ReviewProps } from "@/types";

const Review = ({ formData, discountedPrice, setShowReview }: ReviewProps) => {
  console.log(formData, discountedPrice);

  // post request
  //   {
  //     "manufacturerId": "string",
  //     "serviceIds": [
  //       "string"
  //     ],
  //     "promoCode": "string",
  //     "fullName": "string",
  //     "email": "user@example.com",
  //     "phoneNumber": "string",
  //     "note": "string"
  //   }
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
          <h5 className="h5-regular text-base-100">Peugeot</h5>
        </div>
      </div>
      <Button
        onClick={() => {
          setShowReview(false);
        }}
      />
    </>
  );
};

export default Review;
