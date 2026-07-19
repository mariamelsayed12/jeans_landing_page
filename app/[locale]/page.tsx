"use client";

import Navbar from "@/app/components/ui/navbar";
import HeroSection from "@/app/components/Home/HeroSection";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("navbar");

  return (
    <div className="relative min-h-screen bg-[#EFF1F4] text-[#141414]">
      {/* Floating Header Wrapper */}
      <header className="fixed  left-0 right-0 z-50 px-4 md:px-6  mx-auto">
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
        {/* <div className="max-w-3xl w-full">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "What is your minimum order quantity?", a: "Our wholesale minimum starts at 50 pieces per order. For bulk discounts, we require at least 200 pieces." },
              { q: "Do you ship internationally?", a: "Yes, we ship globally from our manufacturing hub in Alexandria, Egypt. Shipping times and fees vary by location." },
              { q: "Can I request custom labels or branding?", a: "Absolutely! We offer custom embroidery, tags, and label branding for bulk orders." }
            ].map((faq, idx) => (
              <details key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 group">
                <summary className="font-semibold text-lg cursor-pointer list-none flex justify-between items-center select-none">
                  {faq.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform duration-200">▼</span>
                </summary>
                <p className="text-gray-600 mt-4 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div> */}
        <h1>faqs</h1>
      </section>
    </div>
  );
}
