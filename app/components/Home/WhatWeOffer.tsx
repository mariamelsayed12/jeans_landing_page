"use client";
import { useTranslations } from "next-intl";
import { FEATURES } from "@/data";



export default function WhatWeOffer() {
  const t = useTranslations("offer");

  return (
    <section className="w-full bg-[#EFF1F4] py-[60px] px-[15px] md:px-[20px] lg:px-[24px] overflow-hidden select-none">
      <div className="mx-auto flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row items-start justify-between gap-[32px] lg:gap-[24px] w-full max-w-[1296px]">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.id}
              className="flex gap-[12px] items-start w-full max-w-[272px] text-left rtl:text-right"
            >
              {/* Icon Slot */}
              <div className="relative shrink-0 text-[#BCBCBC] mt-[2px] transition-transform duration-200 hover:scale-110">
                <Icon className="size-[32px] object-contain" />
              </div>

              {/* Text Container */}
              <div className="flex flex-col gap-[4px] items-start rtl:items-end text-left rtl:text-right">
                <h3 className="font-poppins font-medium text-[19px] text-[#141414] leading-normal">
                  {t(feature.titleKey)}
                </h3>
                <p className="font-poppins font-normal text-[14px] text-[#464646] leading-normal">
                  {t(feature.descKey)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
