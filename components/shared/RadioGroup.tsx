import React from "react";

// @ts-expect-error module not found
import Radio from "./Radio";

import { RadioGroupProps } from "@/types";

const RadioGroup = ({
  disabled,
  name,
  onChange,
  options,
  containerClasses,
  selectedValue,
}: RadioGroupProps) => {
  const handleChange = (event: React.FormEvent<HTMLInputElement>) =>
    onChange(event.currentTarget.value);

  return (
    <div className={containerClasses}>
      {options.map(({ label: optionLabel, value }) => (
        <div key={value} className="flex gap-2 items-center">
          <Radio
            id={value}
            name={name}
            disabled={disabled}
            label={optionLabel}
            onChange={handleChange}
            value={value}
            checked={selectedValue === value}
          />
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
