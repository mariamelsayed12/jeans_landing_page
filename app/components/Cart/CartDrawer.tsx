"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { RootState } from "@/app/redux/store";
import {
  addToCartAction,
  removeFromCartAction,
} from "@/app/redux/feature/CartSlice";
import CartHeader from "./CartHeader";
import CartItem from "./CartItem";
import CartFooter from "./CartFooter";
import EmptyCartState from "./EmptyCartState";

export default function CartDrawer() {
  const dispatch = useDispatch();
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [isOpen, setIsOpen] = useState(false);

  const { cartProducts } = useSelector(
    (state: RootState) => state.Cart
  );

  // Listen for custom window events to open/close cart
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    window.addEventListener("open-cart", handleOpen);
    window.addEventListener("close-cart", handleClose);

    return () => {
      window.removeEventListener("open-cart", handleOpen);
      window.removeEventListener("close-cart", handleClose);
    };
  }, []);

  // Prevent body scrolling when drawer is open
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

  // Handle ESC key press to close drawer
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

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleCheckout = () => {
    alert(isRtl ? "جاري الانتقال للدفع..." : "Proceeding to checkout...");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer side panel */}
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
            <CartHeader onClose={() => setIsOpen(false)} />

            {/* Middle Section: Cart Items list or Empty UI */}
            {cartProducts.length === 0 ? (
              <EmptyCartState onClose={() => setIsOpen(false)} />
            ) : (
              <div className="flex-1 overflow-y-auto flex flex-col gap-[16px] pr-1 select-none">
                {cartProducts.map((item) => (
                  <CartItem
                    key={`${item.id}-${item.color || ""}-${item.size || ""}`}
                    item={item}
                    onIncrement={() => dispatch(addToCartAction({ ...item, quantity: 1 }))}
                    onDecrement={() => dispatch(addToCartAction({ ...item, quantity: -1 }))}
                    onRemove={() => dispatch(removeFromCartAction(item.id))}
                  />
                ))}
              </div>
            )}

            {/* Footer subtotal & Checkout */}
            {cartProducts.length > 0 && (
              <CartFooter subtotal={subtotal} onCheckout={handleCheckout} />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
