"use client";

import Navbar from "@/app/components/ui/navbar";
import HeroSection from "@/app/components/Home/HeroSection";
import OurMission from "@/app/components/Home/OurMission";
import ProductDetails from "@/app/components/Home/ProductDetails";
import WhatWeOffer from "@/app/components/Home/WhatWeOffer";
import ContactUs from "@/app/components/Home/ContactUs";
import Footer from "@/app/components/ui/Footer";
import Faqs from "@/app/components/Home/Faqs";
import CartDrawer from "@/app/components/Cart/CartDrawer";
import { CheckoutDrawer } from "@/app/components/checkout";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("navbar");

  return (
    <div className="relative min-h-screen bg-[#EFF1F4] text-[#141414]">
      {/* Floating Header Wrapper */}
      <header className="fixed left-0 right-0 z-50">
        <Navbar />
      </header>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Checkout Drawer */}
      <CheckoutDrawer />

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
