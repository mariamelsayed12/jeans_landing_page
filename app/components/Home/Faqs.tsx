"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { FiPlus, FiMinus } from "react-icons/fi";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

function FaqItem({ question, answer, isOpen, onClick, index }: FaqItemProps) {
  return (
    <div className="border-b border-[#EFF1F4] last:border-b-0 w-full transition-all duration-200">
      <button
        type="button"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        className="w-full flex items-center justify-between p-[16px] text-left rtl:text-right cursor-pointer select-none focus:outline-none hover:bg-neutral-50/50 transition-colors duration-200"
      >
        <span className="font-poppins font-medium text-[16px] text-[#464646] pr-[16px] rtl:pr-0 rtl:pl-[16px]">
          {question}
        </span>
        <div className="relative shrink-0 size-[24px] flex items-center justify-center text-[#121212]">
          {isOpen ? (
            <FiMinus className="size-[20px] transition-transform duration-200 transform rotate-180" />
          ) : (
            <FiPlus className="size-[20px] transition-transform duration-200" />
          )}
        </div>
      </button>
      
      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-[16px] pb-[16px]">
            <p className="font-sans font-normal text-[#141414] text-[16px] leading-[1.4] text-left rtl:text-right">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Faqs() {
  const t = useTranslations();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const FAQ_ITEMS = [
    {
      q: t("faqs.q1"),
      a: t("faqs.a1")
    },
    {
      q: t("faqs.q2"),
      a: t("faqs.a2")
    },
    {
      q: t("faqs.q3"),
      a: t("faqs.a3")
    },
    {
      q: t("faqs.q4"),
      a: t("faqs.a4")
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faqs"
      className="w-full bg-[#EFF1F4] py-[60px] px-[16px] md:px-[40px] lg:px-[120px] flex justify-center items-center"
    >
      <div className="w-full max-w-[968px] flex flex-col gap-[32px]">
        {/* Header Row */}
        <div className="w-full flex items-center justify-between">
          <h2 className="font-poppins font-medium text-[32px] md:text-[40px] text-[#141414] leading-normal">
            {t("faqs.title")}
          </h2>
          <button
            type="button"
            className="font-poppins font-medium text-[14px] md:text-[16px] text-[#121212] tracking-wider uppercase hover:underline cursor-pointer focus:outline-none"
          >
            {t("faqs.view_all")}
          </button>
        </div>

        {/* Accordion Card */}
        <div className="w-full bg-white rounded-[16px] flex flex-col shadow-sm border border-neutral-100 overflow-hidden">
          {FAQ_ITEMS.map((item, index) => (
            <FaqItem
              key={index}
              index={index}
              question={item.q}
              answer={item.a}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
