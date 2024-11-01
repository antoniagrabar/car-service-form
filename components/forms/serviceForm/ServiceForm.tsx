"use client";

import { ChangeEvent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Price from "./Price";

import Review from "@/components/Review";
import Button from "@/components/shared/Button";
import Checkbox from "@/components/shared/Checkbox";
import { Input } from "@/components/shared/Input";
import { Radio } from "@/components/shared/Radio";
import { Textarea } from "@/components/shared/Textarea";
import Success from "@/components/Success";
import {
  initialCouponData,
  initialValidationErrors,
  defaultFormValues,
} from "@/constants";
import { getManufacturerName } from "@/lib/utils";
import serviceFormSchema from "@/schemas/serviceFormSchema";
import serviceIdsSchema from "@/schemas/serviceIdsSchema";
import { ServiceFormValidationErrors, ServiceFormProps, Coupon } from "@/types";

const ServiceForm = ({ manufacturers, services }: ServiceFormProps) => {
  const [validationErrors, setValidationErrors] =
    useState<ServiceFormValidationErrors>(initialValidationErrors);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(totalPrice);
  const [coupon, setCoupon] = useState<Coupon>(initialCouponData);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [serviceIds, setServiceIds] = useState<string[]>([]);

  const { register, getValues } = useForm({
    defaultValues: defaultFormValues,
  });

  const handleNextButton = () => {
    const formResult = serviceFormSchema.safeParse(getValues());
    const serviceResult = serviceIdsSchema.safeParse(serviceIds);

    if (formResult.success && serviceResult.success) {
      setShowReview(true);
      setValidationErrors(initialValidationErrors);
    } else {
      setShowReview(false);

      const formErrors = formResult?.error?.format();
      const serviceErrors = serviceResult?.error?.format();

      setValidationErrors({
        manufacturerId: formErrors?.manufacturerId?._errors || [],
        serviceIds: serviceErrors?._errors || [],
        fullName: formErrors?.fullName?._errors || [],
        email: formErrors?.email?._errors || [],
        phoneNumber: formErrors?.phoneNumber?._errors || [],
        note: formErrors?.note?._errors || [],
      });
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target;

    const idStripped = id.split("-")[1];

    setServiceIds((prevServiceIds) => {
      const newServiceIds = checked
        ? [...prevServiceIds, idStripped]
        : prevServiceIds.filter((serviceId) => serviceId !== idStripped);

      const newTotalPrice = services.reduce((sum, service) => {
        return newServiceIds.includes(service.id) ? sum + service.price : sum;
      }, 0);

      setTotalPrice(newTotalPrice);

      return newServiceIds;
    });
  };

  const handleSubmit = async () => {
    try {
      const contact = {
        manufacturerId: getValues().manufacturerId,
        serviceIds,
        fullName: getValues().fullName,
        email: getValues().email,
        phoneNumber: getValues().phoneNumber,
        note: getValues().note,
        promoCode: coupon.code,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact`,
        {
          method: "POST",
          headers: { "x-authentication-token": "borealis-fe-interview-token" },
          body: JSON.stringify(contact),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setShowSuccess(true);
      } else {
        setShowSuccess(false);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Nešto je pošlo po krivu. Molimo pokušajte ponovo.");
    }
  };

  const updateDiscountedPrice = useCallback((value: number) => {
    setDiscountedPrice(value);
  }, []);

  return (
    <>
      {showSuccess ? (
        <Success />
      ) : (
        <div className="flex flex-col gap-5 pt-[40px] px-[30px] pb-5 w-[600px]">
          <h2 className="h2-bold text-base-100">Konfigurator Servisa</h2>

          <form className="gap-[20px] flex flex-col">
            {showReview ? (
              <Review
                manufacturerName={getManufacturerName({
                  manufacturers,
                  id: getValues().manufacturerId,
                })}
                services={services}
                serviceIds={serviceIds}
                formValues={getValues()}
                promoCode={coupon.code}
                discountPercentage={coupon.discountPercentage}
                totalPrice={totalPrice}
                discountedPrice={discountedPrice}
                setShowReview={setShowReview}
                handleSubmit={handleSubmit}
              />
            ) : (
              <>
                <h4 className="h4-bold text-primary-100">
                  Odaberite proizvođača vašeg vozila
                </h4>
                <div className="grid grid-cols-3 gap-[10px]">
                  {manufacturers.map((manufacturer) => (
                    <Radio
                      label={manufacturer.name}
                      key={manufacturer.id}
                      id={manufacturer.id}
                      value={manufacturer.id}
                      {...register("manufacturerId")}
                    />
                  ))}

                  {validationErrors.manufacturerId &&
                    validationErrors.manufacturerId.map((error, index) => (
                      <span className="validation-error" key={index}>
                        {error}
                      </span>
                    ))}
                </div>

                <h4 className="h4-bold text-primary-100">
                  Odaberite jednu ili više usluga koju trebate
                </h4>
                <div className="grid grid-cols-2 gap-[10px]">
                  {services.map((service) => (
                    <Checkbox
                      id={`service-${service.id}`}
                      key={service.id}
                      label={service.name}
                      price={service.price}
                      onChange={(e) =>
                        handleCheckboxChange(e as ChangeEvent<HTMLInputElement>)
                      }
                      defaultChecked={serviceIds.includes(service.id)}
                    />
                  ))}
                  {validationErrors.serviceIds &&
                    validationErrors.serviceIds.map((error, index) => (
                      <span className="validation-error" key={index}>
                        {error}
                      </span>
                    ))}
                </div>

                <Price
                  totalPrice={totalPrice}
                  discountedPrice={discountedPrice}
                  setDiscountedPrice={updateDiscountedPrice}
                  coupon={coupon}
                  setCoupon={setCoupon}
                />

                <h4 className="h4-bold text-primary-100">Vaši podaci</h4>
                <div className="grid grid-cols-2 w-full gap-5">
                  <div>
                    <Input
                      label="Ime i prezime"
                      id="fullName"
                      {...register("fullName")}
                    />

                    {validationErrors.fullName &&
                      validationErrors.fullName.map((error, index) => (
                        <span className="validation-error" key={index}>
                          {error}
                        </span>
                      ))}
                  </div>

                  <div>
                    <Input
                      label="Broj telefona"
                      id="phoneNumber"
                      {...register("phoneNumber")}
                    />
                    {validationErrors.phoneNumber &&
                      validationErrors.phoneNumber.map((error, index) => (
                        <span className="validation-error" key={index}>
                          {error}
                        </span>
                      ))}
                  </div>
                </div>

                <div>
                  <Input
                    label="Email adresa"
                    id="email"
                    {...register("email")}
                  />
                  {validationErrors.email &&
                    validationErrors.email.map((error, index) => (
                      <span className="validation-error" key={index}>
                        {error}
                      </span>
                    ))}
                </div>

                <div>
                  <Textarea
                    label="Napomena (opcionalno)"
                    id="note"
                    rows={3}
                    className="resize-none"
                    {...register("note")}
                  />
                </div>

                <Button onClick={() => handleNextButton()}>
                  <h4 className="h4-regular text-base-600">Dalje</h4>
                </Button>
              </>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default ServiceForm;
