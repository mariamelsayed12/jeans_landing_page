"use client";

import  { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <motion.div
      layout
      className="flex flex-col sm:flex-row gap-[16px] sm:gap-[24px] w-full lg:w-[830px] h-[550px] sm:h-[430px] shrink-0"
    >
      {images.map((img, index) => {
        const isActive = index === activeIndex;
        return (
          <motion.button
            layout
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative rounded-[16px] overflow-hidden border-2 cursor-pointer focus:outline-none select-none transition-all duration-300 ${
              isActive
                ? "border-[var(--color-brand-primary)] shadow-lg shadow-[rgba(141,75,75,0.2)]"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
            style={{
              flex: isActive ? "3.9 1 0%" : "1 1 0%",
              height: "100%",
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 26
            }}
            aria-label={`View product image ${index + 1}`}
          >
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <Image
                src={img}
                alt={`Product preview ${index + 1}`}
                fill
                className="object-cover rounded-[16px]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 300px, 430px"
                priority={index === 0}
              />
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
