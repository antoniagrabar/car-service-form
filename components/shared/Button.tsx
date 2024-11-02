import React, { forwardRef } from "react";

import { Ref, ButtonVariant, ButtonOptions } from "@/types";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonOptions {}

const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  const {
    variant = "primary",
    size = "small",
    type = "button",
    label,
    className,
    children,
    ...rest
  } = props;

  const getButtonClasses = (variant: ButtonVariant) => {
    const variantClasses = {
      primary:
        "bg-primary-100 text-base-600 gap-[5px] border-none hover:bg-primary-200 focus:bg-primary-200",
      secondary:
        "bg-base-600 text-base-100 gap-[10px] border border-base-200 hover:bg-base-500 focus:bg-base-500",
      tertiary:
        "bg-base-600 border-none text-base-100 hover:bg-base-500 focus:bg-base-500",
    };

    return `${variantClasses[variant]}`;
  };

  return (
    <button
      ref={ref}
      type={type}
      className={`px-[15px] py-[5px] rounded-sm disabled:bg-base-400 disabled:text-base-300 ${getButtonClasses(variant)} ${className}`}
      {...rest}
    >
      {label &&
        (size === "big" ? (
          <h3 className="h3-regular">{label}</h3>
        ) : (
          <h4 className="h4-regular">{label}</h4>
        ))}
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
