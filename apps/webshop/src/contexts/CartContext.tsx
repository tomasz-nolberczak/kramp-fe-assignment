import { createContext } from 'react';
import { CartItem } from '../types';

export interface CartContextProps {
  cart: CartItem[];
  addToCart: (
    item: Omit<CartItem, 'productId'> & { productId: string },
  ) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});
