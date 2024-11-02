import Image from "next/image";
import { FormEvent, InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  price?: number;
  disabled?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: FormEvent<HTMLInputElement>) => void;
}

const Checkbox = ({
  id,
  label,
  price,
  disabled,
  defaultChecked,
  onChange,
  className,
  ...props
}: CheckboxProps) => (
  <div
    className={`${disabled ? "opacity-50" : ""} w-full flex gap-2 items-center`}
  >
    <div className="relative">
      <input
        id={id}
        className={`${className} base-radio-checkbox peer relative shrink-0 appearance-none w-4 h-4 rounded-sm bg-white 
          focus:outline-none border checked:bg-primary-100 border-base-300 `}
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
