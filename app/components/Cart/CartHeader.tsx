"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { FiX } from "react-icons/fi";

interface CartHeaderProps {
  onClose: () => void;
}

export default function CartHeader({ onClose }: CartHeaderProps) {
  const t = useTranslations("cart");

  return (
    <div className="w-full flex items-center justify-between pb-4 border-b border-gray-100">
      <h2 className="font-poppins font-semibold text-[28px] text-[#141414] leading-normal">
        {t("title")}
      </h2>
      <button
        onClick={onClose}
        aria-label="Close cart"
        className="w-[36px] h-[36px] bg-white rounded-full shadow-[0px_1px_3px_0px_rgba(0,0,0,0.11)] flex items-center justify-center text-[#141414] hover:bg-neutral-50 transition-colors duration-150 cursor-pointer focus:outline-none"
      >
        <FiX className="size-[20px]" />
      </button>
    </div>
  );
}
