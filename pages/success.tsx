import { useCart } from '@/context/Cart';
import { runFireworks } from '@/libs/utils';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { BsBagCheckFill } from 'react-icons/bs';

const Success = () => {
  const { clear } = useCart();

  useEffect(() => {
    clear();
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email{' '}
          <a className="email" href="sweetycode@example.com">
            sweetycode@example.com
          </a>
        </p>
        <Link href="/">
          <button className="btn">Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
