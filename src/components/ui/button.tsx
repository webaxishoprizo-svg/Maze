import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Ultra-luxury couture button styling - leather-like press feel
        default: [
          "bg-primary text-primary-foreground",
          "shadow-[0_1px_0_hsl(20_10%_12%),0_2px_8px_hsl(30_20%_20%/0.08)]",
          "transition-all duration-[280ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          "hover:shadow-[0_1px_0_hsl(20_10%_12%),0_4px_16px_hsl(30_20%_20%/0.12)]",
          "active:translate-y-[1px] active:shadow-[0_0_0_hsl(20_10%_12%),0_1px_4px_hsl(30_20%_20%/0.06)]",
          "active:transition-duration-[120ms]"
        ].join(" "),
        destructive: [
          "bg-destructive text-destructive-foreground",
          "shadow-[0_1px_0_hsl(0_50%_35%),0_2px_8px_hsl(0_72%_51%/0.15)]",
          "transition-all duration-[280ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          "hover:shadow-[0_1px_0_hsl(0_50%_35%),0_4px_16px_hsl(0_72%_51%/0.2)]",
          "active:translate-y-[1px] active:shadow-[0_0_0_hsl(0_50%_35%),0_1px_4px_hsl(0_72%_51%/0.1)]"
        ].join(" "),
        outline: [
          "border border-input bg-background",
          "shadow-[0_1px_0_hsl(30_15%_80%),0_2px_8px_hsl(30_20%_20%/0.05)]",
          "transition-all duration-[280ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          "hover:shadow-[0_1px_0_hsl(30_15%_80%),0_4px_16px_hsl(30_20%_20%/0.08)]",
          "hover:bg-accent hover:text-accent-foreground",
          "active:translate-y-[1px] active:shadow-[0_0_0_hsl(30_15%_80%),0_1px_4px_hsl(30_20%_20%/0.03)]"
        ].join(" "),
        secondary: [
          "bg-secondary text-secondary-foreground",
          "shadow-[0_1px_0_hsl(30_12%_75%),0_2px_8px_hsl(30_20%_20%/0.05)]",
          "transition-all duration-[280ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          "hover:shadow-[0_1px_0_hsl(30_12%_75%),0_4px_16px_hsl(30_20%_20%/0.08)]",
          "hover:bg-secondary/80",
          "active:translate-y-[1px] active:shadow-[0_0_0_hsl(30_12%_75%),0_1px_4px_hsl(30_20%_20%/0.03)]"
        ].join(" "),
        ghost: [
          "transition-all duration-[280ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          "hover:bg-accent hover:text-accent-foreground",
          "active:translate-y-[1px]"
        ].join(" "),
        link: "text-primary underline-offset-4 hover:underline transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
