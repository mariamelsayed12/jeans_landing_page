import ProductDetailsClient from "./ProductDetailsClient";
import { getProductsListAction } from "@/actions/products.actions";
import ProductDetailsEmpty from "./ProductDetailsEmpty";

export default async function ProductDetails() {
  try {
    const products = await getProductsListAction();

    if (!products || products.length === 0) {
      return <ProductDetailsEmpty />;
    }

    return <ProductDetailsClient products={products} />;
  } catch (error) {
    console.error("Error fetching products:", error);
    return <ProductDetailsEmpty />;
  }
}