import React from "react";
import { cn } from "../../ClassMerger";

const Textarea = React.forwardRef(({ className, error, touched, ...props }, ref) => {
  return (
    <div className="w-full">
      <textarea
        className={cn(
          `flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm ring-offset-background 
          placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 
          focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed 
          disabled:opacity-50 
          ${error && touched ? "border-red-500" : "border-input bg-background"}`,
          className
        )}
        ref={ref}
        {...props}
      />
      {error && touched && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
});

Textarea.displayName = "Textarea";
export default Textarea;
