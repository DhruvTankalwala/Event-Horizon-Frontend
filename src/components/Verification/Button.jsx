import React, { forwardRef } from "react";

export const Button = forwardRef(function Button(
  { className, variant = "default", ...props },
  ref
) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variantStyles = {
    default: "bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:from-purple-600 hover:to-cyan-600",
    secondary: "bg-gray-800 text-white hover:bg-gray-700",
    outline: "border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className || ""}`;

  return <button className={combinedClassName} ref={ref} {...props} />;
});
