import { IProduct } from "@/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addItemToShoppingCart } from "@/app/lib/utils";
import toast from "react-hot-toast";

interface IcartProduct {
  cartProducts: IProduct[];
}

const initialState: IcartProduct = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCartAction: (state, action: PayloadAction<IProduct>) => {
      state.cartProducts = addItemToShoppingCart(
        action.payload,
        state.cartProducts,
      );
    },
    removeFromCartAction: (state, action: PayloadAction<string>) => {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.id !== action.payload,
      );
      toast.success("Removed from your cart", {
        duration: 2000,
      });
    },
    ClearCartAction: (state) => {
      state.cartProducts = [];
      toast.success("Your Cart is empty now", {
        duration: 2000,
      });
    },
  },
});

export const { addToCartAction, removeFromCartAction, ClearCartAction } =
  cartSlice.actions;
export default cartSlice.reducer;
