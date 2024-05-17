import { useCart } from '@/context/Cart';
import Link from 'next/link';
import React from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import Cart from './Cart';

const Navbar = () => {
  const { toggleCart, totalQuantities, showCart, cartItems } = useCart();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Sweety Store</Link>
      </p>
      <button className="cart-icon" onClick={toggleCart}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {showCart && <Cart products={cartItems} />}
    </div>
  );
};

export default Navbar;
