"use client";

import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import React from "react";
import { cn } from "@/app/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer duration-200",
  {
    variants: {
      variant: {
        primary: "bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:opacity-90 active:scale-[0.98] focus-visible:ring-neutral-950",
        secondary: "bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] hover:bg-[#E4E6EB] active:scale-[0.98] focus-visible:ring-neutral-200",
        outline: "border border-[var(--color-border-neutral)] bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-primary)] active:scale-[0.98] focus-visible:ring-neutral-200",
        ghost: "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-primary)] active:scale-[0.98] focus-visible:ring-neutral-200",
        destructive: "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98] focus-visible:ring-red-500",
        link: "bg-transparent text-[var(--color-bg-secondary)] hover:underline underline-offset-4 focus-visible:ring-neutral-950 p-0 h-auto font-normal",
      },
      size: {
        xs: "h-8 px-3 rounded-[8px] text-xs gap-1.5",
        sm: "h-9 px-4 rounded-[12px] text-sm gap-2",
        md: "h-[44px] px-6 py-[8px] rounded-[16px] text-base gap-2",
        lg: "h-[52px] px-8 py-[12px] rounded-[16px] text-base gap-2",
        xl: "h-[60px] px-10 py-[16px] rounded-[16px] text-lg gap-2",
        icon: "size-[36px] p-0 flex items-center justify-center rounded-full shadow-[0px_1px_3px_0px_rgba(0,0,0,0.11)]",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">,
    VariantProps<typeof buttonVariants> {
  href?: string;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

const Button = React.forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      href,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isLink = href !== undefined;
    const isDisabled = disabled || loading;

    const content = (
      <>
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        {children && <span className="truncate">{children}</span>}
        {!loading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </>
    );

    const buttonClasses = cn(buttonVariants({ variant, size, fullWidth, className }));

    if (isLink) {
      return (
        <Link
          href={href}
          className={cn(buttonClasses, isDisabled && "pointer-events-none opacity-50")}
          ref={ref as any}
          {...(props as any)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as any}
        type={type}
        disabled={isDisabled}
        className={buttonClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;