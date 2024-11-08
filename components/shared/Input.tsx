import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

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
          className={`${className} input border-base-500`}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
