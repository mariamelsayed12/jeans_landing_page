"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Button from "@/app/components/ui/Button";

const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 text-[#EFF1F4]"
  >
    <rect width="20" height="20" rx="10" fill="white" fillOpacity="0.1" />
    <path
      d="M14.5 6.5L8.5 12.5L5.5 9.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ContactUs() {
  const t = useTranslations("contact_section");

  const handleScrollToFooter = (e: React.MouseEvent<any>) => {
    e.preventDefault();
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="contact-us"
      className="w-full bg-[var(--color-bg-secondary)] py-[60px] px-[15px] md:px-[20px] lg:px-[24px] overflow-hidden relative"
    >
      <div className="mx-auto flex flex-col lg:flex-row items-center justify-between gap-[40px] lg:gap-0 w-full max-w-[1296px] text-left rtl:text-right">
        {/* Left Column: Text & Benefits */}
        <div className="flex flex-col gap-[32px] items-start rtl:items-end text-left rtl:text-right max-w-[562px] w-full shrink-0">
          <div className="flex flex-col gap-[16px] items-start rtl:items-end w-full">
            {/* Header info */}
            <div className="flex flex-col gap-[4px] items-start rtl:items-end">
              <span className="text-[#D4D5D8] text-[14px] font-medium font-poppins uppercase tracking-wider">
                {t("subtitle")}
              </span>
              <h2 className="text-[#EFF1F4] text-[32px] md:text-[40px] font-poppins font-medium leading-tight">
                {t("title")}
              </h2>
              <p className="text-[#D4D5D8] text-[14px] font-poppins font-normal">
                {t("description")}
              </p>
            </div>

            {/* Checklist */}
            <div className="flex flex-col gap-[8px] w-full items-start rtl:items-end">
              <div className="flex gap-[8px] items-center text-left rtl:text-right">
                <CheckIcon />
                <span className="text-[#EFF1F4] text-[19px] font-poppins font-normal">
                  {t("benefit1")}
                </span>
              </div>
              <div className="flex gap-[8px] items-center text-left rtl:text-right">
                <CheckIcon />
                <span className="text-[#EFF1F4] text-[19px] font-poppins font-normal">
                  {t("benefit2")}
                </span>
              </div>
              <div className="flex gap-[8px] items-center text-left rtl:text-right">
                <CheckIcon />
                <span className="text-[#EFF1F4] text-[19px] font-poppins font-normal">
                  {t("benefit3")}
                </span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            variant="secondary"
            size="lg"
            href="#footer"
            onClick={handleScrollToFooter}
            className="h-[52px] px-[32px] font-poppins font-medium text-[#141414] rounded-[16px] hover:bg-[#E4E6EB] transition-colors"
          >
            {t("button")}
          </Button>
        </div>

        {/* Middle Column: Rotated Divider (Desktop Only) */}
        <div className="hidden lg:flex h-[294px] items-center justify-center w-[100px] shrink-0">
          <div className="relative w-[22px] h-full rotate-15 rtl:-rotate-15">
            <Image
              src="/assets/Line1Contact.svg"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Right Column: Visual Image */}
        <div className="relative w-full max-w-[444px] h-[294px] shrink-0 rounded-[16px] overflow-hidden">
          <Image
            src="/assets/contactusg.png"
            alt="Wholesale partner"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
