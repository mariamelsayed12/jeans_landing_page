"use client";

import React from "react";
import { cn } from "@/app/lib/utils";
import InputErrorMessage from "./InputErrorMessage";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, required, disabled, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-[8px] w-full text-start">
        {label && (
          <label className="font-poppins font-normal text-[16px] text-[#121212] select-none">
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <input
          type={type}
          disabled={disabled}
          ref={ref}
          className={cn(
            "w-full h-[48px] px-[12px] bg-white border border-[#d4d5d8] rounded-[8px] font-poppins font-normal text-[16px] text-[#141414] placeholder-[#747474] transition-all duration-150 focus:outline-none focus:border-[#121212] focus:ring-1 focus:ring-[#121212] disabled:opacity-50 disabled:bg-neutral-50",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <InputErrorMessage msg={error} />}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;