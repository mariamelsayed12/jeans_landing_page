"use client";

import React from "react";
import { useSelector } from "react-redux";
import { useTranslations, useLocale } from "next-intl";
import { RootState } from "@/app/redux/store";

export default function CheckoutSummary() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const { cartProducts } = useSelector((state: RootState) => state.Cart);

  // Map color names to their respective hex codes
  const getColorHex = (colorName?: string) => {
    if (!colorName) return "transparent";
    const name = colorName.toLowerCase();
    if (name === "blue" || name === "أزرق") return "#1D3E8C";
    if (name === "black" || name === "أسود") return "#1C1C1C";
    return "#747474"; // Default grey (like Gray / رمادي)
  };

  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start w-full">
      <h3 className="font-poppins font-medium text-[19px] text-[#464646] text-start w-full">
        {locale === "ar" ? "الطلب" : "Order"}
      </h3>
      
      {/* Items Container with border */}
      <div className="border border-[#d4d5d8] border-solid flex flex-col gap-[12px] items-start p-[16px] rounded-[16px] w-full bg-white select-none">
        {cartProducts.map((item) => {
          const qtyText = item.quantity && item.quantity > 1 ? `${item.quantity}x ` : "";
          const displayName = `${qtyText}${item.title}`;
          const itemTotal = item.price * (item.quantity || 1);

          return (
            <div
              key={`${item.id}-${item.color || ""}-${item.size || ""}`}
              className="flex items-center gap-[12px] w-full justify-between font-poppins font-medium text-[19px] text-[#141414]"
            >
              {/* Color Swatch */}
              <div
                className="w-[32px] h-[32px] rounded-full border border-[#d4d5d8] shadow-sm shrink-0"
                style={{ backgroundColor: getColorHex(item.color) }}
              />

              {/* Title & Multipliers */}
              <p className="flex-1 text-start truncate px-2 font-normal text-[16px] md:text-[19px]">
                {displayName}
              </p>

              {/* Price */}
              <span className="shrink-0 font-medium">
                {itemTotal} {t("egp")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
