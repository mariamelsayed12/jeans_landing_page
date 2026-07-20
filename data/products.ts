import { IProduct } from "@/interface";

export interface ProductData extends IProduct {
  titleKey: string;
  sizes: string[];
}

export const PRODUCTS: ProductData[] = [
  {
    id: "1",
    title: "Classic Street Jeans", // Fallback text
    titleKey: "products.product1.name",
    price: 200,
    images: [
      "/assets/clothes.png",
      "/assets/clothes2.jpg",
      "/assets/clothes.png",
      "/assets/clothes2.jpg"
    ],
    color: "grey",
    colors: ["grey", "blue"],
    size: "XL",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "2",
    title: "Premium Slim Jeans",
    titleKey: "products.product2.name",
    price: 250,
    images: [
      "/assets/clothes2.jpg",
      "/assets/clothes.png",
      "/assets/clothes2.jpg"
    ],
    color: "blue",
    colors: ["blue", "grey"],
    size: "L",
    sizes: ["M", "L", "XL", "XXL"]
  },
  {
    id: "3",
    title: "Comfort Relaxed Jeans",
    titleKey: "products.product3.name",
    price: 300,
    images: [
      "/assets/clothes.png",
      "/assets/clothes2.jpg",
      "/assets/clothes.png"
    ],
    color: "grey",
    colors: ["grey", "blue"],
    size: "M",
    sizes: ["S", "M", "L", "XL"]
  }
];
