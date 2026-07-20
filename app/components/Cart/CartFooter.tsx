"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";

interface CartFooterProps {
  subtotal: number;
  onCheckout?: () => void;
}

export default function CartFooter({ subtotal, onCheckout }: CartFooterProps) {
  const t = useTranslations("cart");
  const locale = useLocale();

  const formattedPrice =
    locale === "ar" ? `${subtotal} ${t("egp")}` : `${subtotal} ${t("egp")}`;

  return (
    <div className="w-full flex flex-col pt-4 ">
      {/* Subtotal Row */}
      {/* <div className="flex items-center justify-between font-poppins text-[#141414] font-medium text-[19px]">
        <span>{t("subtotal")}</span>
        <span>{formattedPrice}</span>
      </div> */}

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        className="w-full h-[52px] bg-[#121212] text-[#eff1f4] rounded-[16px] flex items-center justify-center font-poppins font-medium text-[16px] hover:bg-neutral-800 transition-colors duration-200 cursor-pointer focus:outline-none"
      >
        {t("checkout")}
      </button>
    </div>
  );
}
