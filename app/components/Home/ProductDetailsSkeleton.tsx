"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function ProductDetailsSkeleton() {
  const t = useTranslations("product");

  return (
    <section
      id="projects"
      className="relative w-full bg-[#141414] py-[60px] px-[15px] md:px-[20px] lg:px-[24px] overflow-hidden"
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

      <div className="relative mx-auto flex flex-col gap-[32px] w-full z-10">
        {/* Title Row */}
        <div className="flex items-center w-full">
          <h2 className="font-poppins font-semibold text-[23px] text-[#EFF1F4] leading-normal tracking-wide">
            {t("section_title")}
          </h2>
        </div>

        {/* Gallery & Rotated Tag Row */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-[32px] w-full">
          {/* Gallery Skeleton */}
          <div className="flex flex-col sm:flex-row gap-[16px] sm:gap-[24px] w-full lg:w-[830px] h-[550px] sm:h-[430px] shrink-0">
            {/* Active image skeleton */}
            <div className="rounded-[16px] animate-shimmer flex-[3.9] h-full bg-[#1c1c1c]" />
            {/* Thumbnail skeletons */}
            <div className="rounded-[16px] animate-shimmer flex-1 h-full bg-[#1c1c1c]" />
            <div className="rounded-[16px] animate-shimmer flex-1 h-full bg-[#1c1c1c]" />
          </div>

          {/* Rotated Leather Tag (Desktop Only) */}
          <div className="hidden lg:flex items-center justify-center relative shrink-0 w-[434px] h-[178px] overflow-hidden">
            <div className="relative w-[433px] h-[176px] shrink-0 rounded-[16px] animate-shimmer bg-[#1c1c1c]" />
          </div>
        </div>

        {/* Details & Actions Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-[32px] w-full">
          {/* Left Details & Selection Controls */}
          <div className="flex flex-col gap-[16px] items-start text-start w-full lg:max-w-[500px]">
            {/* Title & Price */}
            <div className="flex flex-col gap-[8px] items-start w-full">
              <div className="h-[24px] w-[220px] rounded-[6px] animate-shimmer bg-[#1c1c1c]" />
              <div className="h-[24px] w-[110px] rounded-[6px] animate-shimmer bg-[#1c1c1c]" />
            </div>

            {/* Swatches & Selection Controls */}
            <div className="flex flex-col gap-[12px] w-full items-start">
              {/* Color Swatches */}
              <div className="flex gap-[12px] items-center">
                <div className="w-[24px] h-[24px] rounded-full animate-shimmer bg-[#1c1c1c]" />
                <div className="w-[24px] h-[24px] rounded-full animate-shimmer bg-[#1c1c1c]" />
              </div>

              {/* Selectors and Add Button Group */}
              <div className="flex flex-col gap-[32px] items-start w-full">
                <div className="flex flex-wrap gap-[16px] items-center w-full justify-start">
                  {/* Size Selector skeleton */}
                  <div className="h-[36px] w-[130px] rounded-[16px] animate-shimmer bg-[#1c1c1c]" />
                  {/* Quantity Counter skeleton */}
                  <div className="h-[36px] w-[96px] rounded-[16px] animate-shimmer bg-[#1c1c1c]" />
                </div>

                {/* Add to Cart button skeleton */}
                <div className="h-[36px] w-[140px] rounded-[16px] animate-shimmer bg-[#1c1c1c]" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Contact Link & Navigation Chevrons */}
        <div className="relative w-full flex flex-col lg:flex-row items-center justify-center gap-[24px] lg:gap-0 mt-[16px] min-h-[52px]">
          {/* Contact text */}
          <div className="flex gap-[8px] items-center justify-start shrink-0 lg:absolute lg:left-0 lg:rtl:left-auto lg:rtl:right-0">
            <div className="h-[20px] w-[210px] rounded-[6px] animate-shimmer bg-[#1c1c1c]" />
          </div>

          {/* Carousel Nav buttons */}
          <div className="flex gap-[12px] justify-center items-center shrink-0">
            <div className="rounded-[16px] size-[52px] animate-shimmer bg-[#1c1c1c]" />
            <div className="rounded-[16px] size-[52px] animate-shimmer bg-[#1c1c1c]" />
          </div>
        </div>
      </div>
    </section>
  );
}
