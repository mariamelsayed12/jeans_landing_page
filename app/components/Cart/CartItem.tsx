"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { IProduct } from "@/interface";

interface CartItemProps {
  item: IProduct;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

export default function CartItem({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemProps) {
  const t = useTranslations("cart");

  // Map color names to their respective hex codes
  const getColorHex = (colorName?: string) => {
    if (!colorName) return "transparent";
    const name = colorName.toLowerCase();
    if (name === "blue" || name === "أزرق") return "#1D3E8C";
    if (name === "black" || name === "أسود") return "#1C1C1C";
    return "#747474"; // Default grey (like Gray / رمادي)
  };

  return (
    <div className="bg-white border border-[#d4d5d8] border-solid flex gap-[12px] items-center p-[16px] rounded-[16px] w-full shrink-0">
      {/* Product Image */}
      <div className="relative size-[74px] rounded-full overflow-hidden shrink-0 border border-gray-100">
        <Image
          src={item.images?.[0] || "/assets/product_gallery_placeholder.png"}
          alt={item.title || "Product"}
          fill
          className="object-cover"
          sizes="74px"
        />
      </div>

      {/* Product Info & Actions */}
      <div className="flex flex-col gap-[12px] flex-1 min-w-0">
        {/* Name and Price */}
        <div className="flex items-center justify-between w-full font-poppins font-medium text-[#141414] text-[18px] md:text-[19px]">
          <p className="truncate pr-2">{item.title}</p>
          <p className="shrink-0">{item.price} {t("egp")}</p>
        </div>

        {/* Color/Size and Selection Controls */}
        <div className="flex items-center justify-between w-full gap-2">
          {/* Options: Color and Size */}
          <div className="flex gap-[8px] items-center shrink-0">
            {item.color && (
              <div
                className="w-[28px] h-[28px] rounded-full border border-[#d4d5d8] shadow-sm shrink-0"
                style={{ backgroundColor: getColorHex(item.color) }}
                title={`${t("color")}: ${item.color}`}
              />
            )}
            {item.size && (
              <span 
                className="font-poppins text-[12px] bg-[#EFF1F4] text-[#464646] px-[10px] py-[4px] rounded-full font-medium border border-neutral-200 shrink-0"
                title={`${t("size")}: ${item.size}`}
              >
                {item.size}
              </span>
            )}
          </div>

          {/* Controls: Delete & Quantity Counter */}
          <div className="flex gap-[8px] items-center shrink-0">
            {/* Delete button */}
            <button
              onClick={onRemove}
              className="bg-white border border-[#d4d5d8] rounded-full size-[32px] flex items-center justify-center text-[#747474] hover:text-[#8d4b4b] hover:border-[#8d4b4b] hover:bg-neutral-50 transition-colors duration-150 cursor-pointer focus:outline-none"
              aria-label="Remove item"
            >
              <FiTrash2 className="size-[16px]" />
            </button>

            {/* Quantity Counter bubble */}
            <div className="bg-white border border-[#d4d5d8] flex gap-[4px] items-center p-[4px] rounded-[16px] h-[32px]">
              <button
                onClick={onDecrement}
                disabled={(item.quantity || 1) <= 1}
                className="size-[24px] border border-[#d4d5d8] rounded-full flex items-center justify-center hover:bg-neutral-50 transition-colors duration-150 cursor-pointer disabled:opacity-30 disabled:pointer-events-none focus:outline-none"
                aria-label="Decrease quantity"
              >
                <FiMinus className="size-[12px] text-[#464646]" />
              </button>
              <span className="font-poppins font-medium text-[15px] text-[#141414] text-center min-w-[18px]">
                {item.quantity || 1}
              </span>
              <button
                onClick={onIncrement}
                className="size-[24px] border border-[#d4d5d8] rounded-full flex items-center justify-center hover:bg-neutral-50 transition-colors duration-150 cursor-pointer focus:outline-none"
                aria-label="Increase quantity"
              >
                <FiPlus className="size-[12px] text-[#464646]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
