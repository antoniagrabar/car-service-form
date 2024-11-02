"use client";

import { ChangeEvent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Price from "@/components/forms/serviceForm/Price";
import Review from "@/components/Review";
import Button from "@/components/shared/Button";
import Checkbox from "@/components/shared/Checkbox";
import Input from "@/components/shared/Input";
import Radio from "@/components/shared/Radio";
import Textarea from "@/components/shared/Textarea";
import Success from "@/components/Success";
import {
  initialCouponData,
  initialValidationErrors,
  defaultFormValues,
} from "@/constants";
import { fetchData } from "@/lib/actions";
import { getManufacturerName } from "@/lib/utils";
import serviceFormSchema from "@/schemas/serviceFormSchema";
import serviceIdsSchema from "@/schemas/serviceIdsSchema";
import {
  ServiceFormValidationErrors,
  Manufacturer,
  Service,
  Coupon,
  FormValues,
} from "@/types";

interface Props {
  manufacturers: Manufacturer[];
  services: Service[];
}

const ServiceForm = ({ manufacturers, services }: Props) => {
  const [validationErrors, setValidationErrors] =
    useState<ServiceFormValidationErrors>(initialValidationErrors);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(totalPrice);
  const [coupon, setCoupon] = useState<Coupon>(initialCouponData);
  const [showReview, setShowReview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [serviceIds, setServiceIds] = useState<string[]>([]);

  const { register, getValues, handleSubmit } = useForm({
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

  const onSubmit = async (data: FormValues) => {
    const contact = {
      ...data,
      serviceIds,
      ...(coupon.code ? { promoCode: coupon.code } : {}),
    };

    const resData = await fetchData("contact", "POST", contact);

    if (resData.message) {
      toast.error("Nešto je pošlo po krivu. Molimo pokušajte ponovo.");
    } else {
      setShowSuccess(true);
    }
  };

  const updateDiscountedPrice = useCallback((value: number) => {
    setDiscountedPrice(value);
  }, []);

  if (showSuccess) return <Success />;

  return (
    <div className="flex flex-col gap-5 pt-[40px] px-[30px] pb-5 w-[600px]">
      <h2 className="h2-bold text-base-100">Konfigurator Servisa</h2>

      <form
        className="gap-[20px] flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
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
                  className={
                    validationErrors.manufacturerId.length > 0
                      ? "error-radio-checkbox"
                      : ""
                  }
                  {...register("manufacturerId")}
                />
              ))}
              {validationErrors.manufacturerId.map((error, index) => (
                <div className="validation-error" key={index}>
                  {error}
                </div>
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
                  className={
                    validationErrors.serviceIds.length > 0
                      ? "error-radio-checkbox"
                      : ""
                  }
                  onChange={(e) =>
                    handleCheckboxChange(e as ChangeEvent<HTMLInputElement>)
                  }
                  defaultChecked={serviceIds.includes(service.id)}
                />
              ))}
              {validationErrors.serviceIds.map((error, index) => (
                <h6 className="validation-error" key={index}>
                  {error}
                </h6>
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
                  placeholder="Unesite ime i prezime"
                  className={
                    validationErrors.fullName.length > 0 ? "border-error" : ""
                  }
                  {...register("fullName")}
                />
                {validationErrors.fullName.map((error, index) => (
                  <h6 className="validation-error" key={index}>
                    {error}
                  </h6>
                ))}
              </div>

              <div>
                <Input
                  label="Broj telefona"
                  id="phoneNumber"
                  placeholder="Unesite broj telefona"
                  className={
                    validationErrors.phoneNumber.length > 0
                      ? "border-error"
                      : ""
                  }
                  {...register("phoneNumber")}
                />
                {validationErrors.phoneNumber.map((error, index) => (
                  <h6 className="validation-error" key={index}>
                    {error}
                  </h6>
                ))}
              </div>
            </div>

            <div>
              <Input
                label="Email adresa"
                id="email"
                placeholder="Unesite email adresu"
                className={
                  validationErrors.email.length > 0 ? "border-error" : ""
                }
                {...register("email")}
              />
              {validationErrors.email.map((error, index) => (
                <h6 className="validation-error" key={index}>
                  {error}
                </h6>
              ))}
            </div>

            <div>
              <Textarea
                label="Napomena (opcionalno)"
                id="note"
                rows={2}
                className={`resize-none ${validationErrors.note.length > 0 ? "border-error" : ""}`}
                placeholder="Unesite napomenu"
                {...register("note")}
              />
              {validationErrors.note.map((error, index) => (
                <h6 className="validation-error" key={index}>
                  {error}
                </h6>
              ))}
            </div>

            <Button label="Dalje" onClick={handleNextButton} />
          </>
        )}
      </form>
    </div>
  );
};

export default ServiceForm;
