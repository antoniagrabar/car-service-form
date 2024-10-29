import React from "react";

import { RadioProps } from "@/types";

const Radio = ({ disabled, id, label, name, onChange, value }: RadioProps) => (
  <div className="flex gap-2 items-start">
    <div className="grid place-items-center mt-1">
      <input
        type="radio"
        id={id}
        name={name}
        disabled={disabled}
        className="
            peer col-start-1 row-start-1 appearance-none shrink-0 w-4 h-4 rounded-full 
            border-radio-checkbox disabled:border-gray-400"
        onChange={onChange}
        value={value}
      />
      <div
        className={`
            pointer-events-none col-start-1 row-start-1 w-[10px] h-[10px] rounded-full
            ${disabled ? "peer-checked:bg-gray-400" : "peer-checked:bg-primary-100"}
          `}
      />
    </div>
    <label
      htmlFor={id}
      className="
          text-start disabled:text-gray-400"
    >
      <h5 className="h5-regular">{label}</h5>
    </label>
  </div>
);

export default Radio;
