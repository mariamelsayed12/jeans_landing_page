"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function ProductDetailsEmpty() {
  const t = useTranslations("product");

  return (
    <section
      id="projects"
      className="relative w-full bg-[#141414] py-[120px] px-[15px] md:px-[20px] lg:px-[24px] overflow-hidden flex flex-col items-center justify-center min-h-[500px]"
    >
      {/* Background Image Overlay */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <Image
          src="/assets/product_bg_jeans.png"
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      <div className="relative mx-auto flex flex-col items-center justify-center gap-[16px] w-full z-10 text-center max-w-[400px]">
        {/* Simple elegant alert or visual marker */}
        <div className="relative size-[64px] mb-[8px] opacity-60">
          <Image
            src="/assets/icon_bag.svg"
            alt=""
            fill
            className="object-contain brightness-0 invert"
          />
        </div>

        <h3 className="font-poppins font-medium text-[20px] text-[#EFF1F4] leading-normal">
          {t("section_title")}
        </h3>
        
        <p className="font-poppins font-normal text-[16px] text-[#D4D5D8] leading-relaxed">
          No products are currently available. Please check back later.
        </p>
      </div>
    </section>
  );
}
