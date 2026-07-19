"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface SizeSelectorProps {
  sizes: string[];
  value: string;
  onChange: (size: string) => void;
}

export default function SizeSelector({ sizes, value, onChange }: SizeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="border border-[#EFF1F4] flex items-center justify-between gap-[8px] px-[12px] py-[6px] rounded-[16px] bg-transparent text-[#EFF1F4] font-medium text-[16px] cursor-pointer hover:bg-neutral-800 transition-colors duration-200 select-none min-w-[70px] h-[36px] focus:outline-none"
      >
        <span className="font-poppins">{value}</span>
        <div className="relative w-[10px] h-[5px] shrink-0 transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>
          <Image
            src="/assets/icon_chevron_down.svg"
            alt=""
            fill
            className="object-contain filter invert"
          />
        </div>
      </button>

      {/* Floating Options Menu */}
      {isOpen && (
        <div className="absolute bottom-[44px] left-0 min-w-[70px] bg-neutral-900 border border-neutral-800 rounded-[12px] overflow-hidden flex flex-col shadow-xl z-30 animate-in fade-in slide-in-from-bottom-2 duration-150">
          {sizes.map((size) => {
            const isSelected = size === value;
            return (
              <button
                key={size}
                type="button"
                onClick={() => {
                  onChange(size);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-[12px] py-[8px] font-poppins text-[15px] transition-colors duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-[var(--color-brand-primary)] text-white"
                    : "text-[#EFF1F4] hover:bg-neutral-800"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
