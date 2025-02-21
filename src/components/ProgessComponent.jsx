import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "./ClassMerger";

const ProgressComponent = ({ className, value, ...props }) => (
  <ProgressPrimitive.Root
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-gray-700", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
);

export default ProgressComponent
