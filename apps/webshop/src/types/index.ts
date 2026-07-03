export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: ProductCategory;
  stock: number;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export const productCategories = [
  'Tools',
  'Fasteners',
  'Safety Equipment',
  'Power Tools',
] as const;

export type ProductCategory = (typeof productCategories)[number];
