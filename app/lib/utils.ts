import { IProduct } from "@/interface";
import { clsx, type ClassValue } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Define the function to accept a `toast` function as a parameter
export const addItemToShoppingCart = (
  carItem: IProduct,
  shoppingCartItems: IProduct[] = [],
) => {
  const existsItem = shoppingCartItems.find((item) => item.id === carItem.id);

  if (existsItem) {
    const isDecrement = carItem.quantity === -1;

    if (isDecrement) {
      return shoppingCartItems.map((item) =>
        item.id === carItem.id
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) - 1) }
          : item,
      );
    }

    const addAmount = carItem.quantity && carItem.quantity > 0 ? carItem.quantity : 1;

    toast.success("Item already exists, the quantity will be increased", {
      duration: 2000,
    });
    return shoppingCartItems.map((item) =>
      item.id === carItem.id
        ? { ...item, quantity: (item.quantity || 1) + addAmount }
        : item,
    );
  }

  toast.success("Added to your Cart", {
    duration: 2000,
  });

  const initialQuantity = carItem.quantity && carItem.quantity > 0 ? carItem.quantity : 1;
  return [...shoppingCartItems, { ...carItem, quantity: initialQuantity }];
};
