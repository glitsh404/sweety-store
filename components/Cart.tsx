import { useCart } from '@/context/Cart';
import { CartItemType } from '@/context/Cart/type';
import { urlFor } from '@/libs/client';
import getStripe from '@/libs/getStripe';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-hot-toast';
import {
  AiOutlineLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';

interface CartProps {
  products: CartItemType[];
}

const Cart: React.FC<CartProps> = ({ products }) => {
  const {
    totalPrice,
    toggleCartItemQuantity,
    totalQuantities,
    toggleCart,
    removeItemFromCart,
  } = useCart();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products: products,
      }),
    });
    if (response.status === 500) return;

    const data = await response.json();
    toast.loading('Redirecting...');
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <button className="cart-heading" onClick={toggleCart}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>
        {products.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button onClick={toggleCart} className="btn">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {products.length >= 1 &&
            products.map((p, i) => (
              <div className="product" key={p._id}>
                <img
                  className="cart-product-image"
                  src={urlFor(p.image[0]) as any}
                  alt=""
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5 className="spec-name">{p.name}</h5>
                    <h4>${p.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuantity(p._id, p.quantity - 1)
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{p.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuantity(p._id, p.quantity + 1)
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => removeItemFromCart(p)}
                      className="remove-item"
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {products.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal: </h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button onClick={handleCheckout} className="btn">
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
