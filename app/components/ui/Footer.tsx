"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { IoLocationOutline } from "react-icons/io5";

export default function Footer() {
  const t = useTranslations("footer");

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] px-6 md:px-14 lg:px-[80px] py-[40px] font-poppins">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-0">
        {/* Left Column: Brand Box & Tagline */}
        <div className="flex flex-col gap-[8px] items-start text-start">
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, "home")}
            className="flex bg-[var(--color-bg-primary)] opacity-[0.64] px-[8px] h-[64px]  rounded-[16px] gap-[8px] items-center hover:opacity-85 transition-opacity shrink-0"
            aria-label="Algammal Inc. Home"
          >
            <Image
              src="/assets/LogoElgammal.svg"
              alt="logo"
              width={47}
              height={38}
              priority
            />
            <span
              className="font-bold text-[14px] text-[#141414] tracking-wider font-TROX"
              style={{ fontVariationSettings: '"MORF" 0, "wdth" 0, "BNCE" 1' }}
            >
              ELGammal
            </span>
          </a>

          <p className="font-medium text-[16px] text-[var(--color-border-neutral)] whitespace-pre-line">
            {t("tradition")}
          </p>
        </div>

        {/* Center Column: Navigation Links */}
        <div className="flex flex-col gap-[16px] items-start text-start">
          <a
            href="#about"
            onClick={(e) => handleScrollTo(e, "about")}
            className="font-medium text-[16px] text-[var(--color-text-primary)] hover:text-[var(--color-brand-primary)] transition-colors duration-200"
          >
            {t("About")}
          </a>
          <a
            href="#projects"
            onClick={(e) => handleScrollTo(e, "projects")}
            className="font-medium text-[16px] text-[var(--color-text-primary)] hover:text-[var(--color-brand-primary)] transition-colors duration-200"
          >
            {t("Products")}
          </a>
          <a
            href="#faqs"
            onClick={(e) => handleScrollTo(e, "faqs")}
            className="font-medium text-[16px] text-[var(--color-text-primary)] hover:text-[var(--color-brand-primary)] transition-colors duration-200"
          >
            {t("FAQs")}
          </a>
          <a
            href="#testimonials"
            onClick={(e) => handleScrollTo(e, "home")}
            className="font-medium text-[16px] text-[var(--color-text-primary)] hover:text-[var(--color-brand-primary)] transition-colors duration-200"
          >
            {t("Testimonials")}
          </a>
        </div>

        {/* Right Column: Contact Details & Social Icons */}
        <div className="flex flex-col gap-[16px] items-start text-start">
          <p className="font-regular text-[16px] text-[var(--color-text-primary)]">
            {t("Connect")}
          </p>

          {/* Phone Details */}
          <div className="flex gap-[8px] items-center">
            <Image
              src="/assets/phone.svg"
              alt="phone"
              width={24}
              height={24}
              className="shrink-0"
            />
            <a
              href="tel:+201111111111"
              className="font-regular text-[16px] text-[var(--color-text-primary)] hover:underline"
              dir="ltr"
            >
              +201111111111
            </a>
          </div>

          {/* Location Details */}
          <div className="flex gap-[8px] items-center">
            <div className="relative w-[24px] h-[24px] shrink-0">
              <Image
                src="/assets/boxicons_location.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <span className="font-regular text-[16px] text-[var(--color-text-primary)]">
              {t("Address")}
            </span>
          </div>

          {/* Social Links */}
          <div className="flex gap-[8px] items-center mt-[8px]">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[30px] h-[30px] flex items-center justify-center rounded-full hover:scale-110 transition-transform duration-200"
              aria-label="Instagram"
            >
              <Image
                src="/assets/instagram.svg"
                alt="Instagram"
                width={25}
                height={25}
              />
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[30px] h-[30px] flex items-center justify-center rounded-full hover:scale-110 transition-transform duration-200"
              aria-label="Facebook"
            >
              <Image
                src="/assets/facebook.svg"
                alt="Facebook"
                width={25}
                height={25}
              />
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[30px] h-[30px] flex items-center justify-center rounded-full hover:scale-110 transition-transform duration-200"
              aria-label="TikTok"
            >
              <Image
                src="/assets/tiktok.svg"
                alt="TikTok"
                width={25}
                height={25}
              />
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[25px] h-[25px] flex items-center justify-center hover:scale-110 transition-transform duration-200"
              aria-label="YouTube"
            >
              <Image
                src="/assets/youtube.svg"
                alt="YouTube"
                width={25}
                height={25}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
