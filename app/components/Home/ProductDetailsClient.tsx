"use client";
import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import ProductGallery from "./ProductGallery";
import SizeSelector from "./SizeSelector";
import QuantityCounter from "./QuantityCounter";
import Button from "@/app/components/ui/Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useAppDispatch } from "@/app/redux/store";
import { addToCartAction } from "@/app/redux/feature/CartSlice";
import { IProduct } from "@/interface";
import { Product } from "@prisma/client";

interface Props {
  products: Product[];
}

export default function ProductDetailsClient({ products }: Props) {
  const dispatch = useAppDispatch();
  const t = useTranslations("product");
  const locale = useLocale();

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProduct = products[currentIndex];

  const sizes = currentProduct?.sizes || [];
  const variants = currentProduct?.variants || [];

  const [selectedSize, setSelectedSize] = useState(
    sizes[0] || "",
  );
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const currentVariant = variants[selectedColorIndex] || variants[0] || null;
  const galleryImages = currentVariant ? currentVariant.images : [];

  const handleProductChange = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < products.length) {
      setCurrentIndex(newIndex);
      const newProduct = products[newIndex];
      setSelectedSize(newProduct.sizes[0] || "");
      setSelectedColorIndex(0);
      setQuantity(1);
    }
  };

  const handleAddToCart = () => {
    if (!currentProduct) return;
    const localizedTitle = currentProduct.name[locale as "en" | "ar"] || currentProduct.name.en;
    const localizedColorName = currentVariant
      ? (currentVariant.color[locale as "en" | "ar"] || currentVariant.color.en)
      : "";

    const productToCart: IProduct = {
      id: currentProduct.id,
      title: localizedTitle,
      price: currentProduct.price,
      quantity: quantity,
      color: localizedColorName,
      size: selectedSize,
      images: galleryImages,
    };
    dispatch(addToCartAction(productToCart));
  };

  const handleScrollToFooter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!currentProduct) return null;

  const localizedName = currentProduct.name[locale as "en" | "ar"] || currentProduct.name.en;

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
            {currentProduct.name[locale as "en" | "ar"] || currentProduct.name.en}
          </h2>
        </div>

        {/* Gallery & Rotated Tag Row */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-[32px] w-full">
          <ProductGallery
            images={currentProduct.variants[selectedColorIndex].images}
            key={`${currentProduct.id}-${selectedColorIndex}`}
          />

          {/* Rotated Leather Tag (Desktop Only) */}
          <div className="hidden lg:flex items-center justify-center relative shrink-0 w-[434px] h-[178px] overflow-hidden">
            <div className="relative w-[433px] h-[176px] shrink-0">
              <Image
                src="/assets/imgCard.png"
                alt="Brand Tag"
                fill
                className="object-contain rtl:rotate-180"
                priority
              />
            </div>
          </div>
        </div>

        {/* Details & Actions Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-[32px] w-full">
          {/* Left Details & Selection Controls */}
          <div className="flex flex-col gap-[16px] items-start text-start w-full lg:max-w-[500px]">
            {/* Title & Price */}
            <div className="flex flex-col gap-[4px] items-start">
              <h3 className="font-poppins font-medium text-[19px] text-[#EFF1F4] leading-normal">
                {localizedName}
              </h3>
              <p className="font-poppins font-medium text-[19px] text-[#EFF1F4] leading-normal">
                {locale === "ar"
                  ? `${currentProduct.price} جنيه`
                  : `${currentProduct.price} EGP`}
              </p>
            </div>

            {/* Swatches & Selection Dropdowns */}
            <div className="flex flex-col gap-[12px] w-full items-start">
              {/* Color Swatches */}
              <div className="flex gap-[12px] items-center">
                {variants.map((variant, index) => {
                  const colorKey = variant.color.en.toLowerCase();
                  let bgColor = "#747474";
                  if (colorKey === "blue") bgColor = "#1D3E8C";
                  if (colorKey === "black") bgColor = "#1C1C1C";

                  const localizedColorName = variant.color[locale as "en" | "ar"] || variant.color.en;

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedColorIndex(index)}
                      className={`w-[24px] h-[24px] rounded-full border-2 transition-all duration-150 cursor-pointer ${
                        selectedColorIndex === index
                          ? "border-white scale-110"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: bgColor }}
                      aria-label={`${localizedColorName} color option`}
                    />
                  );
                })}
              </div>

              {/* Selectors and Add Button Group */}
              <div className="flex flex-col gap-[32px] items-start w-full">
                <div className="flex flex-wrap gap-[16px] items-center w-full justify-start">
                  <SizeSelector
                    sizes={sizes}
                    value={selectedSize}
                    onChange={setSelectedSize}
                  />
                  <QuantityCounter value={quantity} onChange={setQuantity} />
                </div>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={handleAddToCart}
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
        </div>

        {/* Bottom Bar: Contact Link & Navigation Chevrons */}
        <div className="relative w-full flex flex-col lg:flex-row items-center justify-center gap-[24px] lg:gap-0 mt-[16px] min-h-[52px]">
          {/* Contact text */}
          <div className="flex gap-[8px] items-center font-poppins justify-start shrink-0 lg:absolute lg:left-0 lg:rtl:left-auto lg:rtl:right-0">
            <span className="text-[#D4D5D8] text-[16px] font-normal">
              {t("stock_pricing_prefix")}
            </span>
            <a
              href="#contact-us"
              onClick={handleScrollToFooter}
              className="text-[#EFF1F4] text-[19px] font-medium hover:underline cursor-pointer"
            >
              {t("contact_us")}
            </a>
          </div>

          {/* Carousel Nav buttons */}
          <div className="flex gap-[12px] justify-center items-center shrink-0">
            {/* Prev Button */}
            <button
              type="button"
              onClick={() => handleProductChange(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="border border-[#EFF1F4] flex items-center justify-center rounded-[16px] size-[52px] cursor-pointer hover:bg-neutral-800 transition-colors duration-150 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none"
              aria-label="Previous product"
            >
              <IoIosArrowBack className="size-[20px] text-white rtl:rotate-180" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={() => handleProductChange(currentIndex + 1)}
              disabled={currentIndex === products.length - 1}
              className="border border-[#EFF1F4] flex items-center justify-center rounded-[16px] size-[52px] cursor-pointer hover:bg-neutral-800 transition-colors duration-150 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none"
              aria-label="Next product"
            >
              <IoIosArrowForward className="size-[20px] text-white rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
