import { urlFor } from '@/libs/client';
import Link from 'next/link';
import React from 'react';

const HeroBanner = ({ herobanner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{herobanner.smallText}</p>
        <h3>{herobanner.midText}</h3>
        <h1>{herobanner.largeText1}</h1>
        <img
          src={urlFor(herobanner.image) as any}
          alt="headphones"
          className="hero-banner-image"
        />
        <div>
          <Link href={'/product/' + herobanner.product}>
            <button className="" type="button">
              {herobanner.buttonText}
            </button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{herobanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
