import { CartItemType } from '@/context/Cart/type';
import { client } from '@/libs/client';
import React from 'react';
import { Product, FooterBanner, HeroBanner } from '../components';

type HomeProps = {
  products: CartItemType[];
  banner: any;
};

const Home = ({ products, banner }: HomeProps) => {
  return (
    <>
      <HeroBanner herobanner={banner.length && banner[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <h2>Speakers for many variations</h2>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner banner={banner && banner[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  const banner = await client.fetch(bannerQuery);
  return {
    props: {
      products,
      banner,
    },
  };
};

export default Home;
