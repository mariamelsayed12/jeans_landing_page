"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import Button from "@/app/components/ui/Button";
import Image from "next/image";

interface NavbarProps {
  variant?: "transparent" | "light";
}

// Custom SVG Icons based on exact Figma paths
const BagIcon = () => (
  <svg
    className="size-[24px] text-black transition-colors duration-200 group-hover:text-[#8d4b4b]"
    viewBox="0 0 21.2 22.4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.2 7.6V4.6C14.2 2.61178 12.5882 1 10.6 1C8.61177 1 7 2.61177 7 4.6V7.6M3.32727 21.4H17.8727C19.158 21.4 20.2 20.3774 20.2 19.116L18.7091 6.99997C18.7091 5.73854 17.6671 4.71595 16.3818 4.71595H4.52727C3.24196 4.71595 2.2 5.73854 2.2 6.99997L1 19.116C1 20.3774 2.04196 21.4 3.32727 21.4Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    className="size-[24px] text-black"
    viewBox="0 0 18 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17 13H1M17 7H1M17 1H1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="size-[24px] text-black"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 18L18 6M6 6l12 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Navbar = ({ variant = "transparent" }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  const t = useTranslations("navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const isRtl = locale === "ar";

  const navLinks = [
    { name: "About", id: "about", key: "About" },
    { name: "Product", id: "projects", key: "Product" },
    { name: "Stock Pricing", id: "stock-pricing", key: "Stock Pricing" },
    { name: "FAQs", id: "faqs", key: "FAQs" },
  ];

  // Scroll spy effect to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "stock-pricing", "faqs", "contact"];
      const scrollPosition = window.scrollY + 100; // offset for navbar height

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // Navbar height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  };

  // Language change handler
  const changeLanguage = (newLocale: string) => {
    const segments = pathname.split("/");
    if (segments[1] === locale) {
      segments[1] = newLocale;
    } else {
      // If there's no locale segment, insert it
      segments.splice(1, 0, newLocale);
    }
    const newPath = segments.join("/") || "/";
    router.push(newPath);
  };

  return (
    <>
      <nav 
        className="w-full h-[71px] rounded-[16px] shadow-[0_8px_32px_rgba(20,20,20,0.08)] transition-all duration-300 relative z-40"
        style={{
          backgroundColor: "rgba(239, 241, 244, 0.55)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(25.75px)",
          WebkitBackdropFilter: "blur(25.75px)"
        }}
      >
        {/* Desktop Navbar layout */}
        <div className="hidden lg:flex h-full items-center justify-between px-[120px] py-[13px]">
          {/* Logo Section */}
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, "home")}
            className="flex gap-[8px] items-center hover:opacity-85 transition-opacity shrink-0"
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
              className="font-normal text-[14px] text-[#141414] tracking-wider font-TROX"
              style={{ fontVariationSettings: '"MORF" 0, "wdth" 0, "BNCE" 1' }}
            >
              ELGammal
            </span>
          </a>

          {/* Right Navigation & Actions */}
          <div className="flex items-center gap-[95px]">
            {/* Nav Links */}
            <div className="flex items-center gap-[32px] font-medium text-[16px] text-black">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleScrollTo(e, link.id)}
                    className={`relative py-1 transition-colors duration-200 hover:text-[#8d4b4b] ${
                      isActive ? "text-[#8d4b4b] font-semibold" : "text-black/80"
                    }`}
                  >
                    {t(link.key)}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8d4b4b] rounded" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Language & Bag Section */}
            <div className="flex items-center gap-[16px]">
              <button
                onClick={() => changeLanguage(locale === "en" ? "ar" : "en")}
                className="font-medium text-[16px] text-black hover:text-[#8d4b4b] transition-colors focus:outline-none cursor-pointer"
              >
                {locale === "en" ? "العربيه" : "English"}
              </button>
              <button 
                className="relative size-[32px] flex items-center justify-center group focus:outline-none cursor-pointer"
                aria-label={locale === "en" ? "Shopping Cart" : "سلة التسوق"}
              >
                <BagIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Navbar layout */}
        <div className="lg:hidden flex h-full items-center justify-between px-[16px] py-[13px] w-full">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label={locale === "en" ? "Open Menu" : "افتح القائمة"}
            className="relative size-[24px] flex items-center justify-center focus:outline-none cursor-pointer hover:opacity-80 transition-opacity"
          >
            <MenuIcon />
          </button>
          
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, "home")}
            className="flex gap-[8px] items-center hover:opacity-85 transition-opacity shrink-0"
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
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Panel */}
      <div
        className={`fixed top-0 bottom-0 z-50 w-[269px] bg-white shadow-2xl pb-[16px] pt-[24px] px-[16px] flex flex-col gap-[32px] transition-transform duration-300 ease-in-out lg:hidden
          ${isRtl ? "right-0" : "left-0"}
          ${isMobileMenuOpen 
            ? "translate-x-0" 
            : isRtl ? "translate-x-full" : "-translate-x-full"}`}
      >
        {/* Drawer Header with Close Button */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex gap-[8px] items-center">
            <Image
              src="/assets/LogoElgammal.svg"
              alt="logo"
              width={35}
              height={28}
            />
            <span 
              className="font-bold text-sm tracking-wider text-[#141414] font-TROX"
              style={{ fontVariationSettings: '"MORF" 0, "wdth" 0, "BNCE" 1' }}
            >
              ELGammal
            </span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label={locale === "en" ? "Close Menu" : "إغلاق القائمة"}
            className="focus:outline-none cursor-pointer hover:opacity-80 transition-opacity"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex flex-col gap-[12px] w-full">
          <div className="flex flex-col w-full">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <div key={link.id} className="h-[48px] flex items-center w-full">
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleScrollTo(e, link.id)}
                    className={`[word-break:break-word] font-medium text-[16px] w-full text-left transition-colors duration-200 ${
                      isActive ? "text-[#8d4b4b] font-semibold" : "text-[#141414]"
                    }`}
                  >
                    {t(link.key)}
                  </a>
                </div>
              );
            })}
          </div>

          {/* Drawer Language Switcher (Pill style) */}
          <div className="border border-[#d4d5d8] border-solid flex h-[32px] items-center rounded-[12px] w-fit p-0.5 mt-2">
            <button
              onClick={() => changeLanguage("ar")}
              className={`h-full items-center justify-center px-[12px] rounded-[10px] text-[14px] font-medium transition-colors cursor-pointer ${
                locale === "ar" 
                  ? "bg-[#eff1f4] text-[#141414]" 
                  : "text-[#141414]/60 hover:text-[#141414]"
              }`}
            >
              Arabic
            </button>
            <button
              onClick={() => changeLanguage("en")}
              className={`h-full items-center justify-center px-[12px] rounded-[10px] text-[14px] font-medium transition-colors cursor-pointer ${
                locale === "en" 
                  ? "bg-[#eff1f4] text-[#141414]" 
                  : "text-[#141414]/60 hover:text-[#141414]"
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Contact Us button inside Drawer */}
        <div className="mt-auto">
          <Button
            onClick={(e) => handleScrollTo(e, "contact")}
            variant="primary"
            size="md"
            fullWidth
          >
            {locale === "en" ? "Contact Us" : "اتصل بنا"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
