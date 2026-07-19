"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function OurMission() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      className="w-full bg-[var(--color-bg-primary)] py-[60px] px-[15px] md:px-[20px] lg:pl-[24px] lg:pr-0 lg:rtl:pl-0 lg:rtl:pr-[24px]"
    >
      <div className="mx-auto flex flex-col lg:flex-row items-center gap-[32px] lg:gap-[24px] w-full">
        {/* Left Column: Text */}
        <div className="w-full lg:w-[562px] flex flex-col gap-[24px] items-start rtl:items-end text-left rtl:text-right shrink-0">
          {/* Heading & Line Group */}
          <div className="flex flex-col items-start rtl:items-end w-full">
            <h2 className="font-poppins font-semibold lg:font-medium text-[28px] lg:text-[40px] text-[#141414] leading-normal tracking-wide">
              {t("title")}
            </h2>
            {/* Underline Image */}
            <div className="relative w-[285px] h-[4px] mt-[8px]">
              <Image
                src="/assets/mission_line.svg"
                alt=""
                fill
                className="object-contain object-left rtl:object-right"
                priority
              />
            </div>
          </div>

          {/* Description Text */}
          <p className="font-poppins font-normal text-[19px] text-[#464646] leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Right Column: Image with Fade Gradient */}
        <div className="relative w-full h-[494px] lg:flex-1 rounded-[16px] overflow-hidden">
          <Image
            src="/assets/mission_bg.png"
            alt="Our Mission"
            fill
            className="object-cover rounded-[16px]"
            priority
          />
          {/* Blending Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-[#eff1f4] from-[1.2%] to-[rgba(239,241,244,0.2)] to-[19.3%] pointer-events-none rounded-[16px]" />
        </div>
      </div>
    </section>
  );
}
