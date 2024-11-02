import React, { forwardRef } from "react";

import { RadioProps } from "@/types";

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ id, label, disabled, className, ...props }, ref) => {
    return (
      <div className={`${disabled ? "opacity-50" : ""} flex gap-2 items-start`}>
        <div className="grid place-items-center mt-1">
          <input
            type="radio"
            id={id}
            disabled={disabled}
            className={`${className} base-radio-checkbox peer col-start-1 row-start-1 appearance-none shrink-0 w-4 h-4 rounded-full border-base-300`}
            ref={ref}
            {...props}
          />
          <div className="pointer-events-none col-start-1 row-start-1 w-[10px] h-[10px] rounded-full peer-checked:bg-primary-100" />
        </div>
        <label htmlFor={id} className="text-start">
          <h5 className="h5-regular">{label}</h5>
        </label>
      </div>
    );
  }
);

Radio.displayName = "Radio";

export default Radio;
