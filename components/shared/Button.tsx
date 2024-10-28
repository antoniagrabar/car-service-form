import React, { forwardRef } from "react";

import { ButtonProps, ButtonVariant, Ref } from "@/types";

const getVariant = (variant: ButtonVariant) => {
  switch (variant) {
    case "primary":
      return "btn-primary";
    case "secondary":
      return "btn-secondary";
    default:
      return "";
  }
};

const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  const {
    variant = "primary",
    type = "button",
    className,
    children,
    ...rest
  } = props;

  return (
    <button
      ref={ref}
      type={type}
      className={`${getVariant(variant)} ${className || ""}`}
      {...rest}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
