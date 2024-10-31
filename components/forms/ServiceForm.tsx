"use client";

import { ChangeEvent, useCallback, useState } from "react";
import toast from "react-hot-toast";

import Price from "../Price";
import Review from "../Review";
import Button from "../shared/Button";
import Checkbox from "../shared/Checkbox";
import { Input } from "../shared/Input";
import RadioGroup from "../shared/RadioGroup";
import { Textarea } from "../shared/Textarea";
import Success from "../Success";

import {
  initialCouponData,
  initialFormData,
  initialValidationErrors,
} from "@/constants";
import { getManufacturerName } from "@/lib/utils";
import serviceFormSchema from "@/schemas/serviceFormSchema";
import {
  ServiceFormValidationErrors,
  FormData,
  ServiceFormProps,
  Coupon,
} from "@/types";

const ServiceForm = ({ manufacturers, services }: ServiceFormProps) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [validationErrors, setValidationErrors] =
    useState<ServiceFormValidationErrors>(initialValidationErrors);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(totalPrice);
  const [coupon, setCoupon] = useState<Coupon>(initialCouponData);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  console.log("tu");

  const handleNextButton = () => {
    const result = serviceFormSchema.safeParse(formData);

    if (result.success) {
      setShowReview(true);
      setValidationErrors(initialValidationErrors);
    } else {
      setShowReview(false);
      const errors = result.error.format();

      setValidationErrors({
        manufacturerId: errors.manufacturerId?._errors || [],
        serviceIds: errors.serviceIds?._errors || [],
        fullName: errors.fullName?._errors || [],
        email: errors.email?._errors || [],
        phoneNumber: errors.phoneNumber?._errors || [],
      });
    }
  };

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    },
    []
  );

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target;

    const idStripped = id.split("-")[1];

    setFormData((prevData) => {
      const newServiceIds = checked
        ? [...prevData.serviceIds, idStripped]
        : prevData.serviceIds.filter((serviceId) => serviceId !== idStripped);

      const newTotalPrice = services.reduce((sum, service) => {
        return newServiceIds.includes(service.id) ? sum + service.price : sum;
      }, 0);

      setTotalPrice(newTotalPrice);

      return { ...prevData, serviceIds: newServiceIds };
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact`,
        {
          method: "POST",
          headers: { "x-authentication-token": "borealis-fe-interview-token" },
          body: JSON.stringify({ ...formData, promoCode: coupon.code }),
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
                  id: formData.manufacturerId,
                })}
                services={services}
                formData={formData}
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
                <div>
                  <RadioGroup
                    name="manufacturers-group"
                    containerClasses="grid grid-cols-3 gap-[10px]"
                    options={manufacturers.map((manufacturer) => ({
                      label: manufacturer.name,
                      value: manufacturer.id,
                    }))}
                    onChange={(id) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        manufacturerId: id,
                      }))
                    }
                    selectedValue={formData.manufacturerId}
                  />
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
                      defaultChecked={formData.serviceIds.includes(service.id)}
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
                      name="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange(e)}
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
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange(e)}
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
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange(e)}
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
                    name="note"
                    value={formData.note}
                    label="Napomena (opcionalno)"
                    id="note"
                    rows={3}
                    className="resize-none"
                    onChange={(e) => handleInputChange(e)}
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
