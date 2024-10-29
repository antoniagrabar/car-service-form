import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary";
}

function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  const baseClasses =
    "inline-flex items-center rounded-full border focus:outline-none px-[10px]";

  const variantClasses = {
    default: "bg-light-100 border border-base-400",
    secondary: "bg-primary-100 border border-base-400",
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}

export { Badge };