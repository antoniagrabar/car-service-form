import { forwardRef } from "react";

import { InputProps } from "@/types";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, className, type, ...props }, ref) => {
    return (
      <div>
        {label && id && (
          <label htmlFor={id}>
            <h6 className="h6-regular text-base-100 ml-2.5">{label}</h6>
          </label>
        )}

        <input
          id={id}
          type={type}
          className={`${className} bg-base-500 appearance-none border border-base-500 rounded-sm text-[16px] font-medium leading-[24px] w-full pl-2.5 py-[5px] pr-[5px] text-base-100 focus:outline-none`}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
