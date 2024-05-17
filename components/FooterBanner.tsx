import { urlFor } from '@/libs/client';
import Link from 'next/link';
import React from 'react';

const FooterBanner = ({
  banner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    product,
    desc,
    buttonText,
    image,
  },
}) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button>{buttonText}</button>
          </Link>
        </div>
        <img src={urlFor(image) as any} className="footer-banner-image" />
      </div>
    </div>
  );
};

export default FooterBanner;
