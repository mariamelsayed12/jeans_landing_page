"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface SlideData {
  id: number;
  titleKey: string;
  descKey: string;
  image: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    titleKey: "slide1.title",
    descKey: "slide1.description",
    image: "/assets/hero1.png",
  },
  {
    id: 2,
    titleKey: "slide2.title",
    descKey: "slide2.description",
    image: "/assets/hero2.png",
  },
  {
    id: 3,
    titleKey: "slide3.title",
    descKey: "slide3.description",
    image: "/assets/hero3.png",
  },
];

export default function HeroSection() {
  const t = useTranslations("hero");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play logic
  useEffect(() => {
    if (!hovered) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [hovered]);

  const handleIndicatorClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div
      className="relative w-full h-[677px] overflow-hidden select-none bg-[#121212]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, idx) => {
          const isActive = idx === currentSlide;
          const hasError = imageErrors[slide.id];

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {hasError ? (
                /* Fallback Premium Gradient Background */
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-850 opacity-90" />
              ) : (
                <>
                  {/* Background Image (Loads dynamically if placed in /public/assets/) */}
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    priority={idx === 0}
                    className="object-cover"
                    sizes="100vw"
                    onError={() => {
                      setImageErrors((prev) => ({ ...prev, [slide.id]: true }));
                    }}
                  />
                  {/* Base Black Tint Overlay */}
                  <div className="absolute inset-0 bg-black/15" />
                  {/* Direction-Aware Gradient Overlay to keep text readable on light image backgrounds */}
                  <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-black/75 via-black/35 to-transparent pointer-events-none" />
                </>
              )}

              {/* Content Box aligned to navbar padding constraints */}
              <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-14 lg:px-[24px] text-white items-start">
                <div className="max-w-[562px] flex flex-col gap-[24px] items-start text-start">
                  {/* Decorative Top Line */}
                  <Image
                    src="/assets/Line1.svg"
                    alt="line"
                    width={285}
                    height={4}
                    className="h-auto"
                  />

                  {/* Slide Title (split dynamically into lines with 24px vertical gap) */}
                  {t(slide.titleKey)
                    .split("\n")
                    .map((line, lineIdx) => (
                      <h1
                        key={lineIdx}
                        className="w-full text-4xl md:text-5xl lg:text-[64px] font-medium leading-[1.0] tracking-tight text-[#EFF1F4] drop-shadow-sm font-poppins"
                      >
                        {line}
                      </h1>
                    ))}

                  {/* Slide Description */}
                  <p className="w-full text-sm md:text-base text-[#EFF1F4]/90 font-light leading-[1.5] max-w-xl">
                    {t(slide.descKey)}
                  </p>

                  {/* Decorative Bottom Line */}
                  <Image
                    src="/assets/Line2.svg"
                    alt="line"
                    width={285}
                    height={4}
                    className="h-auto"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Indicators (Forced to LTR to keep slide dots order stable) */}
      <div
        dir="ltr"
        className="absolute bottom-[40px] left-1/2 -translate-x-1/2 z-20 flex gap-[11px] items-center"
      >
        {slides.map((_, idx) => {
          const isActive = idx === currentSlide;

          return (
            <button
              key={idx}
              onClick={() => handleIndicatorClick(idx)}
              className={`rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
                isActive
                  ? "size-[14px] bg-[#EFF1F4] scale-100"
                  : "size-[14px] bg-[#EFF1F4]/40 hover:bg-[#EFF1F4]/60 scale-90"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
