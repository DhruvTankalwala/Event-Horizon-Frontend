import React from "react";

const Input = React.forwardRef(({ className, type = "text", error, touched, ...props }, ref) => {
  return (
    <div className="w-full">
      <input
        type={type}
        className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background 
          file:border-0 file:bg-transparent file:text-sm file:font-medium 
          placeholder:text-muted-foreground focus-visible:outline-none 
          focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
          disabled:cursor-not-allowed disabled:opacity-50
          ${error && touched ? "border-red-500" : "border-input bg-background"} 
          ${className || ""}`}
        ref={ref}
        {...props}
      />
      {error && touched && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";
export { Input };
