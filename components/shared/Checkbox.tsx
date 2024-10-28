import Image from "next/image";

import { CheckboxProps } from "@/types";

const Checkbox = ({
  id,
  label,
  price,
  disabled,
  defaultChecked,
  onChange,
  ...props
}: CheckboxProps) => (
  <div className="w-full flex gap-2 items-center">
    <div className="relative">
      <input
        id={id}
        className="
          peer relative shrink-0 appearance-none w-4 h-4 rounded-sm bg-white 
          focus:outline-none border-radio-checkbox checked:bg-primary-100 
           checked:border-0 disabled:bg-gray-300 
        "
        type="checkbox"
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
        {...props}
      />
      <Image
        src={"/vectors/check-icon.svg"}
        className="absolute inset-0 w-3 h-3 mx-auto mt-[4px] pointer-events-none hidden peer-checked:block stroke-white"
        alt="check-icon"
        width={12}
        height={10}
      />
    </div>
    <label htmlFor={id} className="text-start disabled:text-gray-400">
      <h5 className="h5-regular mb-1">
        {label} {price && <span className="text-primary-100">({price}€)</span>}
      </h5>
    </label>
  </div>
);

export default Checkbox;
