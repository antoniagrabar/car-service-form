import React, { forwardRef } from "react";

import { ButtonProps, Ref, ButtonVariant, ButtonSize } from "@/types";

const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  const {
    variant = "primary",
    size = "default",
    type = "button",
    className,
    children,
    ...rest
  } = props;

  const getButtonClasses = (variant: ButtonVariant, size: ButtonSize) => {
    const variantClasses = {
      primary:
        "bg-primary-100 text-base-600 rounded-sm gap-[5px] border-none hover:bg-primary-200 focus:bg-primary-200",
      secondary: "bg-transparent text-base-100 rounded-sm gap-[10px]",
    };

    const sizeClasses = {
      default: "py-[5px] px-[15px]",
      sm: "p-[5px]",
    };

    return `${variantClasses[variant]} ${sizeClasses[size]}`;
  };

  return (
    <button
      ref={ref}
      type={type}
      className={`${getButtonClasses(variant, size)} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
