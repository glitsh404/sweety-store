import { ReactNode } from 'react';

export type Child = { children: ReactNode };

export type CartItemType = {
  _id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  slug: string;
};

export type CartContextType = {
  showCart: boolean;
  toggleCart: () => void;
  cartItems: CartItemType[];
  addItemToCart: (item: CartItemType, quantity: number) => void;
  removeItemFromCart: (item: CartItemType) => void;
  toggleCartItemQuantity: (itemId: number, newQuantity: number) => void;
  incQty: () => void;
  decQty: () => void;
  addTotalPrice: (price: number, sign?: string) => void;
  totalPrice: number;
  totalQuantities: number;
  qty: number;
  setQty: (qty: number) => void;
  clear: () => void;
};
