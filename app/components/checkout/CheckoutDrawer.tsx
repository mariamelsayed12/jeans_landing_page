"use client";

import React, { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import CartHeader from "../Cart/CartHeader";
import CheckoutForm from "./CheckoutForm";

export default function CheckoutDrawer() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [isOpen, setIsOpen] = useState(false);

  // Listen to custom window events for opening/closing the checkout drawer
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    window.addEventListener("open-checkout", handleOpen);
    window.addEventListener("close-checkout", handleClose);

    return () => {
      window.removeEventListener("open-checkout", handleOpen);
      window.removeEventListener("close-checkout", handleClose);
    };
  }, []);

  // Block body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close drawer on pressing the ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Checkout Drawer Side Panel */}
          <motion.div
            initial={{ x: isRtl ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? "-100%" : "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className={`fixed top-0 bottom-0 z-50 w-full max-w-[504px] bg-[#EFF1F4] shadow-2xl p-[24px] md:p-[32px] flex flex-col gap-[32px] ${
              isRtl ? "left-0" : "right-0"
            }`}
          >
            {/* Header */}
            <CartHeader onClose={handleClose} />

            {/* Form & Content */}
            <CheckoutForm onSuccess={handleClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
