"use client";

import Navbar from "@/app/components/ui/navbar";
import HeroSection from "@/app/components/Home/HeroSection";
import OurMission from "@/app/components/Home/OurMission";
import ProductDetails from "@/app/components/Home/ProductDetails";
import WhatWeOffer from "@/app/components/Home/WhatWeOffer";
import ContactUs from "@/app/components/Home/ContactUs";
import Footer from "@/app/components/ui/Footer";
import Faqs from "@/app/components/Home/Faqs";
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
      <OurMission />

      {/* Product Details Section */}
      <ProductDetails />


       {/* What We Offer Section */}
      <WhatWeOffer />

      {/* Contact Us Section */}
      <ContactUs />

      {/* FAQs Section */}
      <Faqs />

      <Footer />
    </div>
  );
}
