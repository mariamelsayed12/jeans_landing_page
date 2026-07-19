"use client";

import Navbar from "@/app/components/ui/navbar";
import HeroSection from "@/app/components/Home/HeroSection";
import Footer from "@/app/components/ui/Footer";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("navbar");

  return (
    <div className="relative min-h-screen bg-[#EFF1F4] text-[#141414]">
      {/* Floating Header Wrapper */}
      <header className="fixed top-[24px] left-0 right-0 z-50 px-4 md:px-6 max-w-[1440px] mx-auto">
        <Navbar />
      </header>

      {/* Hero Section */}
      <section id="home" className="w-full">
        <HeroSection />
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen flex flex-col items-center justify-center bg-white px-6 md:px-24"
      >
        <h1>about</h1>
      </section>

      {/* Product Section */}
      <section
        id="projects"
        className="min-h-screen flex flex-col items-center justify-center bg-[#EFF1F4] px-6 md:px-24"
      >
        <h1>product</h1>
      </section>

      {/* Stock Pricing Section */}
      <section
        id="stock-pricing"
        className="min-h-screen flex flex-col items-center justify-center bg-white px-6 md:px-24"
      >
        <h1>stock pricing</h1>
      </section>

      {/* FAQs Section */}
      <section
        id="faqs"
        className="min-h-screen flex flex-col items-center justify-center bg-[#EFF1F4] px-6 md:px-24"
      >
       
        <h1>faqs</h1>
      </section>

      <Footer />
    </div>
  );
}
