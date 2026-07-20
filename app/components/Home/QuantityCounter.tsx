"use client";

import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

interface QuantityCounterProps {
  value: number;
  onChange: (value: number) => void;
}

export default function QuantityCounter({ value, onChange }: QuantityCounterProps) {
  const handleDecrement = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    onChange(value + 1);
  };

  return (
    <div className="border border-[#EFF1F4] flex items-center justify-between gap-[8px] p-[4px] rounded-[16px] bg-transparent text-[#EFF1F4] h-[36px] min-w-[90px] select-none">
      {/* Decrement Button */}
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= 1}
        className="w-[24px] h-[24px] border border-[#EFF1F4] rounded-full hover:bg-neutral-800 flex items-center justify-center transition-colors duration-150 focus:outline-none disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
        aria-label="Decrease quantity"
      >
        <FiMinus className="w-[14px] h-[14px] text-[#EFF1F4]" />
      </button>

      {/* Value Display */}
      <span className="font-poppins font-medium text-[16px] text-[#EFF1F4] text-center min-w-[16px]">
        {value}
      </span>

      {/* Increment Button */}
      <button
        type="button"
        onClick={handleIncrement}
        className="w-[24px] h-[24px] border border-[#EFF1F4] rounded-full hover:bg-neutral-800 flex items-center justify-center transition-colors duration-150 focus:outline-none cursor-pointer"
        aria-label="Increase quantity"
      >
        <FiPlus className="w-[14px] h-[14px] text-[#EFF1F4]" />
      </button>
    </div>
  );
}
