import React, { createContext, useState, useContext, FC } from 'react';
import { toast } from 'react-hot-toast';
import { CartContextType, Child, CartItemType } from './type';

const CartContext = createContext<CartContextType>({
  showCart: false,
  toggleCart: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  toggleCartItemQuantity: () => {},
  incQty: () => {},
  decQty: () => {},
  totalPrice: 0,
  totalQuantities: 0,
  qty: 1,
  setQty: () => {},
  addTotalPrice: () => {},
  clear: () => {},
});

export const CartProvider: FC<Child> = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const addItemToCart = (item: CartItemType, quantity: number) => {
    // check if the item is already in the cart
    const check = cartItems.find((product) => item._id === product._id);

    // update the total price and quantities
    setTotalPrice((prevPrice) => prevPrice + item.price * quantity);
    setTotalQuantities((prevQty) => prevQty + quantity);

    if (check) {
      const updatedCartItems = cartItems.map((cp) => {
        if (cp._id === item._id) {
          return {
            ...cp,
            quantity: cp.quantity + quantity,
          };
        }
        return cp;
      });
      setCartItems(updatedCartItems);
    } else {
      item.quantity = quantity;
      setCartItems([...cartItems, { ...item }]);
    }

    // says that the product has been added to the cart.
    toast.success(`${quantity} ${item.name} added to the cart.`);
  };

  const removeItemFromCart = (item: CartItemType) => {
    // remove the item from the cart
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem._id !== item._id)
    );

    // update the total price and quantities
    setTotalPrice((prevPrice) => prevPrice - (item.price * item.quantity));
    setTotalQuantities((prevQty) => prevQty - item.quantity);
  };

  const incQty = () => {
    setQty((prev) => prev + 1);
  };

  const decQty = () => {
    setQty((prev) => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    });
  };

  const clear = () => {
    localStorage.clear();
    setCartItems([]);
    setTotalQuantities(0);
    addTotalPrice(0);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const addTotalPrice = (price: number, sign = '+') => {
    if (sign === '+') {
      setTotalPrice((prev) => prev + price);
    } else {
      setTotalPrice((prev) => prev - price);
    }
  };

  const toggleCartItemQuantity = (itemId: number, newQuantity: number) => {
    // get the current cart items and find the item to update
    const currentCartItems = [...cartItems];
    const itemIndex = currentCartItems.findIndex((item) => item._id === itemId);

    if (itemIndex === -1) {
      // if the item is not found, show an error message
      toast.error(`Item with ID ${itemId} not found in cart`);
    } else {
      const item = currentCartItems[itemIndex];
      // if the original quantity is greater than the new quantity then the user is decreasing
      if (item.quantity > newQuantity) {
        // if the item is more than one item minus normally
        if (item.quantity > 1) {
          // update the item quantity and show a success message
          item.quantity = newQuantity;
          setCartItems(currentCartItems);
          setTotalQuantities(newQuantity);
          addTotalPrice(item.price, '-');
          toast.success(
            `Quantity of item with ID ${itemId} updated to ${newQuantity}`
          );
        } else {
          removeItemFromCart(item);
          toast.success(`The product ${item.name} is removed`);
        }
      }
      // else that means the user is increasing
      else {
        // update the item quantity and show a success message
        item.quantity = newQuantity;
        setCartItems(currentCartItems);
        setTotalQuantities(newQuantity);
        addTotalPrice(item.price);
        toast.success(
          `Quantity of item with ID ${itemId} updated to ${newQuantity}`
        );
      }
    }
  };

  const contextValues: CartContextType = {
    showCart,
    toggleCart,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    totalPrice,
    totalQuantities,
    qty,
    setQty,
    incQty,
    decQty,
    toggleCartItemQuantity,
    addTotalPrice,
    clear,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
