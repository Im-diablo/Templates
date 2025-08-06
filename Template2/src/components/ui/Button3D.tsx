import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

const button3DVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 transform-gpu perspective-1000",
  {
    variants: {
      variant: {
        hero: [
          "bg-gradient-primary text-primary-foreground",
          "border border-primary/20",
          "shadow-glow-primary",
          "hover:shadow-3d-hover hover:scale-105",
          "hover:rotate-x-6 hover:rotate-y-6",
          "active:scale-95",
          "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-primary/20 before:to-secondary/20 before:opacity-0 before:transition-opacity before:duration-300",
          "hover:before:opacity-100",
          "after:absolute after:inset-0 after:rounded-lg after:bg-white/10 after:opacity-0 after:transition-opacity after:duration-300",
          "hover:after:opacity-100"
        ],
        neon: [
          "bg-card/20 text-foreground border-2 border-primary",
          "shadow-glow-primary",
          "hover:bg-primary/10 hover:shadow-glow-primary",
          "hover:scale-110 hover:rotate-3",
          "transition-all duration-500",
          "before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-primary before:opacity-0 before:scale-95",
          "hover:before:opacity-100 hover:before:scale-105 before:transition-all before:duration-300",
          "animate-pulse-glow"
        ],
        hologram: [
          "bg-gradient-secondary text-secondary-foreground",
          "border border-secondary/30",
          "shadow-glow-secondary",
          "hover:shadow-3d hover:scale-105",
          "relative overflow-hidden",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
          "before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
          "animate-hologram"
        ],
        cyber: [
          "bg-accent/20 text-accent border border-accent",
          "shadow-glow-accent",
          "hover:bg-accent/30 hover:shadow-3d-hover",
          "hover:scale-105 hover:skew-x-3",
          "transition-all duration-400",
          "relative"
        ]
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        md: "h-10 px-4 py-2 rounded-lg",
        lg: "h-12 px-6 py-3 text-base rounded-lg",
        xl: "h-16 px-8 py-4 text-lg rounded-xl"
      }
    },
    defaultVariants: {
      variant: "hero",
      size: "md"
    }
  }
);

export interface Button3DProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button3DVariants> {}

const Button3D = forwardRef<HTMLButtonElement, Button3DProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(button3DVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

Button3D.displayName = "Button3D";

export { Button3D, button3DVariants };