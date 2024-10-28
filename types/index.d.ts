import React from "react";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonOptions {
  variant?: ButtonVariant;
}

export type Ref = HTMLButtonElement;

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonOptions;
