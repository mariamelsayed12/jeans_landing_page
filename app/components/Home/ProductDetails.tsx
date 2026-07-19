"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ProductGallery from "./ProductGallery";
import SizeSelector from "./SizeSelector";
import QuantityCounter from "./QuantityCounter";
import Button from "@/app/components/ui/Button";

const PRODUCT_IMAGES = [
  "/assets/clothes.png",
  "/assets/clothes2.jpg",
    "/assets/clothes2.jpg",
      "/assets/clothes2.jpg"

];

const SIZES = ["S", "M", "L", "XL", "XXL"];

export default function ProductDetails() {
  const t = useTranslations("product");
  const [selectedSize, setSelectedSize] = useState("XL");
  const [quantity, setQuantity] = useState(3);
  const [selectedColor, setSelectedColor] = useState("grey"); // "grey" | "blue"

  const handleScrollToFooter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

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

      <div className="relative max-w-[1440px] mx-auto flex flex-col gap-[32px] w-full z-10">
        {/* Title Row */}
        <div className="flex items-center w-full">
          <h2 className="font-poppins font-semibold text-[23px] text-[#EFF1F4] leading-normal tracking-wide">
            {t("section_title")}
          </h2>
        </div>

        {/* Gallery & Rotated Tag Row */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-[32px] w-full">
          <ProductGallery images={PRODUCT_IMAGES} />
          
          {/* Rotated Leather Tag (Desktop Only) */}
          <div className="hidden lg:flex items-center justify-center relative shrink-0 w-[434px] h-[178px] overflow-hidden">
            <div className="relative w-[433px] h-[176px]  shrink-0">
              <Image
                src="/assets/imgCard.png"
                alt="Brand Tag"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Details & Actions Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-[32px] w-full">
          {/* Left Details & Selection Controls */}
          <div className="flex flex-col gap-[16px] items-start rtl:items-end text-left rtl:text-right w-full lg:max-w-[500px]">
            {/* Title & Price */}
            <div className="flex flex-col gap-[4px] items-start rtl:items-end">
              <h3 className="font-poppins font-medium text-[19px] text-[#EFF1F4] leading-normal">
                {t("name")}
              </h3>
              <p className="font-poppins font-medium text-[19px] text-[#EFF1F4] leading-normal">
                {t("price")}
              </p>
            </div>

            {/* Rating Stars */}
            <div className="relative w-[56px] h-[24px]">
              <Image
                src="/assets/product_rating_stars.svg"
                alt="Product Rating"
                fill
                className="object-contain object-left rtl:object-right"
              />
            </div>

            {/* Swatches & Selection Dropdowns */}
            <div className="flex flex-col gap-[12px] w-full items-start rtl:items-end">
              {/* Color Swatches */}
              <div className="flex gap-[12px] items-center">
                <button
                  type="button"
                  onClick={() => setSelectedColor("grey")}
                  className={`w-[24px] h-[24px] rounded-full border-2 transition-all duration-150 cursor-pointer ${
                    selectedColor === "grey" ? "border-white scale-110" : "border-transparent"
                  }`}
                  style={{ backgroundColor: "#747474" }}
                  aria-label="Grey color option"
                />
                <button
                  type="button"
                  onClick={() => setSelectedColor("blue")}
                  className={`w-[24px] h-[24px] rounded-full border-2 transition-all duration-150 cursor-pointer ${
                    selectedColor === "blue" ? "border-white scale-110" : "border-transparent"
                  }`}
                  style={{ backgroundColor: "#1D3E8C" }}
                  aria-label="Blue color option"
                />
              </div>

              {/* Selectors and Add Button Group */}
              <div className="flex flex-wrap gap-[16px] items-center w-full justify-start rtl:justify-end">
                <SizeSelector
                  sizes={SIZES}
                  value={selectedSize}
                  onChange={setSelectedSize}
                />
                <QuantityCounter
                  value={quantity}
                  onChange={setQuantity}
                />
                
                <Button
                  variant="secondary"
                  size="md"
                  className="h-[36px] px-[24px] rounded-[16px] hover:bg-[#E4E6EB] transition-colors"
                  leftIcon={
                    <div className="relative w-[20px] h-[20px] shrink-0">
                      <Image
                        src="/assets/icon_bag.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  }
                >
                  {t("add_to_cart")}
                </Button>
              </div>
            </div>
          </div>

          {/* Right Contact Link & Navigation Chevrons */}
          <div className="flex flex-row items-center justify-between gap-[24px] w-full lg:w-auto shrink-0 border-t border-neutral-800 lg:border-t-0 pt-[16px] lg:pt-0">
            {/* Contact text */}
            <div className="flex gap-[8px] items-center text-[16px] font-poppins">
              <span className="text-[#D4D5D8]">{t("stock_pricing_prefix")}</span>
              <a
                href="#footer"
                onClick={handleScrollToFooter}
                className="text-[#EFF1F4] font-medium hover:underline cursor-pointer"
              >
                {t("contact_us")}
              </a>
            </div>

            {/* Carousel Nav buttons */}
            <div className="flex gap-[12px] items-center">
              {/* Prev Button */}
              <button
                type="button"
                className="border border-[#EFF1F4] flex items-center justify-center rounded-[16px] size-[52px] cursor-pointer hover:bg-neutral-800 transition-colors duration-150 focus:outline-none"
                aria-label="Previous product"
              >
                <div className="relative w-[10px] h-[10px] shrink-0 rtl:rotate-180">
                  <Image
                    src="/assets/icon_chevron_left.svg"
                    alt=""
                    fill
                    className="object-contain filter invert"
                  />
                </div>
              </button>

              {/* Next Button */}
              <button
                type="button"
                className="border border-[#EFF1F4] flex items-center justify-center rounded-[16px] size-[52px] cursor-pointer hover:bg-neutral-800 transition-colors duration-150 focus:outline-none"
                aria-label="Next product"
              >
                <div className="relative w-[10px] h-[10px] shrink-0 rtl:rotate-180">
                  <Image
                    src="/assets/icon_chevron_right.svg"
                    alt=""
                    fill
                    className="object-contain filter invert"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
