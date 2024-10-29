"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import Price from "../Price";
import Button from "../shared/Button";
import Checkbox from "../shared/Checkbox";
import { Input } from "../shared/Input";
import RadioGroup from "../shared/RadioGroup";
import { Textarea } from "../shared/Textarea";

import serviceFormSchema from "@/schemas/serviceFormSchema";
import {
  ServiceFormValidationErrors,
  FormData,
  ServiceFormProps,
} from "@/types";

const ServiceForm = ({ manufacturers, services }: ServiceFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    manufacturerId: "",
    serviceIds: [],
    promoCode: "",
    name: "",
    email: "",
    phone: "",
    note: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const [validationErrors, setValidationErrors] =
    useState<ServiceFormValidationErrors>({
      manufacturerId: [],
      serviceIds: [],
      name: [],
      email: [],
      phone: [],
      note: [],
    });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleNextButton = () => {
    const result = serviceFormSchema.safeParse(formData);

    if (result.success) {
      console.log("success");
    } else {
      const errors = result.error.format();

      setValidationErrors({
        ...validationErrors,
        manufacturerId: errors.manufacturerId?._errors || [],
        serviceIds: errors.serviceIds?._errors || [],
        name: errors.name?._errors || [],
        email: errors.email?._errors || [],
        phone: errors.phone?._errors || [],
        note: errors.note?._errors || [],
      });
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target;

    console.log(checked, id);

    setFormData((prevData) => {
      const newServiceIds = checked
        ? [...prevData.serviceIds, id]
        : prevData.serviceIds.filter((serviceId) => serviceId !== id);

      const newTotalPrice = services.reduce((sum, service) => {
        return newServiceIds.includes(service.id) ? sum + service.price : sum;
      }, 0);

      setTotalPrice(newTotalPrice);

      return { ...prevData, serviceIds: newServiceIds };
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log(e);
  };

  return (
    <>
      <form
        ref={formRef}
        onSubmit={(e) => handleSubmit(e)}
        className="gap-[20px] flex flex-col"
      >
        <h4 className="h4-bold text-primary-100">
          Odaberite proizvođača vašeg vozila
        </h4>
        <div>
          <RadioGroup
            name="manufacturers-group"
            containerClasses="grid grid-cols-3 gap-[10px]"
            options={manufacturers.map((manufacturer) => ({
              label: manufacturer.name,
              value: `radio-${manufacturer.id}`,
            }))}
            onChange={(id) =>
              setFormData((prevData) => ({ ...prevData, manufacturerId: id }))
            }
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
              id={service.id}
              key={service.id}
              label={service.name}
              price={service.price}
              onChange={(e) =>
                handleCheckboxChange(e as ChangeEvent<HTMLInputElement>)
              }
            />
          ))}
          {validationErrors.serviceIds &&
            validationErrors.serviceIds.map((error, index) => (
              <span className="validation-error" key={index}>
                {error}
              </span>
            ))}
        </div>

        <Price totalPrice={totalPrice} />

        <h4 className="h4-bold text-primary-100">Vaši podaci</h4>
        <div className="grid grid-cols-2 w-full gap-5">
          <div>
            <Input
              label="Ime i prezime"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => handleInputChange(e)}
            />
            {validationErrors.name &&
              validationErrors.name.map((error, index) => (
                <span className="validation-error" key={index}>
                  {error}
                </span>
              ))}
          </div>

          <div>
            <Input
              label="Broj telefona"
              id="phone"
              name="phone"
              type="number"
              value={formData.phone}
              onChange={(e) => handleInputChange(e)}
            />
            {validationErrors.phone &&
              validationErrors.phone.map((error, index) => (
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
          {validationErrors.note &&
            validationErrors.note.map((error, index) => (
              <span className="validation-error" key={index}>
                {error}
              </span>
            ))}
        </div>

        <Button onClick={() => handleNextButton()}>
          <h4 className="h4-regular text-base-600">Dalje</h4>
        </Button>
      </form>
    </>
  );
};

export default ServiceForm;
