export interface IProduct {
  id: string;
  title: string;
  price: number;
  quantity?: number;
  color: string;
  size: string;
  description?: string;
  images: string[];
  colors?: string[];
}