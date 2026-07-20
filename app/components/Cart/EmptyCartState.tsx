"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { FiShoppingBag } from "react-icons/fi";

interface EmptyCartStateProps {
  onClose: () => void;
}

export default function EmptyCartState({ onClose }: EmptyCartStateProps) {
  const t = useTranslations("cart");

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-[24px] px-6 text-center w-full my-auto">
      {/* Icon Wrapper */}
      <div className="w-[80px] h-[80px] rounded-full bg-[#EFF1F4] flex items-center justify-center text-[#464646]">
        <FiShoppingBag className="size-[36px]" />
      </div>

      {/* Text Info */}
      <div className="flex flex-col gap-[8px]">
        <h3 className="font-poppins font-medium text-[20px] text-[#141414]">
          {t("empty_title")}
        </h3>
        <p className="font-poppins font-normal text-[14px] text-[#747474] max-w-[280px]">
          {t("empty_desc")}
        </p>
      </div>

      {/* Close/Continue Button */}
      <button
        onClick={onClose}
        className="h-[44px] px-[24px] bg-[#121212] text-[#eff1f4] rounded-[16px] flex items-center justify-center font-poppins font-medium text-[14px] hover:bg-neutral-800 transition-colors duration-200 cursor-pointer focus:outline-none"
      >
        {t("continue_shopping")}
      </button>
    </div>
  );
}
