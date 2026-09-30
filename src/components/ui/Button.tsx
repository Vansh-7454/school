import React from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "goldOutline";
  size?: "sm" | "md" | "lg";
  href?: string;
  showArrow?: boolean;
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      showArrow = false,
      isLoading = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "min-h-[44px] h-11 px-5 text-xs",
      md: "min-h-[44px] h-12 px-7 text-sm",
      lg: "min-h-[48px] h-14 px-9 text-base",
    };

    const variantClasses = {
      primary:
        "bg-gradient-to-r from-[#DFBE72] via-[#C9A24B] to-[#B38B38] text-[#0B1B3A] shadow-gold hover:brightness-105 active:scale-95 border-none",
      secondary:
        "bg-[#0B1B3A] text-[#FAF6ED] hover:bg-[#12274A] border border-[#C9A24B]/30 hover:border-[#C9A24B] shadow-md",
      ghost:
        "bg-transparent text-inherit border border-[#C9A24B]/40 hover:bg-[#C9A24B]/10 hover:border-[#C9A24B]",
      goldOutline:
        "bg-transparent text-[#C9A24B] border border-[#C9A24B] hover:bg-[#C9A24B]/15",
    };

    const baseClasses = cn(
      "group relative inline-flex items-center justify-center gap-2.5 font-sans font-semibold tracking-wider uppercase rounded-full select-none transition-all duration-300 overflow-hidden cursor-pointer",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B] focus-visible:ring-offset-2",
      "hover:-translate-y-0.5",
      "disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none",
      sizeClasses[size],
      variantClasses[variant],
      className
    );

    // Subtle light shine sweep overlay on hover
    const shineOverlay = (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
    );

    const innerContent = (
      <>
        {shineOverlay}
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        <span className="relative z-10 leading-none">{children}</span>
        {showArrow && (
          <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
        )}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={baseClasses}>
          {innerContent}
        </Link>
      );
    }

    return (
      <button ref={ref} disabled={disabled || isLoading} className={baseClasses} {...props}>
        {innerContent}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
