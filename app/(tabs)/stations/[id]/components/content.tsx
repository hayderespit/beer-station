'use client';
import Product from '@/components/product';
import Tabs from '@/components/tabs';
import { CartProduct } from '@/repository/types';
import { InternalLinks } from '@/utils/constants';
import Prisma from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import React, { FC, useState } from 'react';

enum TabList {
  products = 'products',
  cart = 'cart',
}

type Props = {
  stationId: number;
  products: Prisma.Product[];
  cartProducts: CartProduct[];
};

const Content: FC<Props> = (props) => {
  const { products, stationId, cartProducts } = props;
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || TabList.products;
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  return (
    <>
      <Tabs onChange={setActiveTab} activeTab={activeTab}>
        <Tabs.Tab id={TabList.products} label="Products" />
        <Tabs.Tab id={TabList.cart} label="Shopping Cart" />
      </Tabs>

      <div className="p-4">
        {activeTab === TabList.products && (
          <>
            {products.map((product) => {
              return (
                <Product
                  key={product.id}
                  href={InternalLinks.productDetail(stationId, product.id)}
                  imageUrl={product.imageUrl}
                  name={product.name}
                  price={product.price}
                  rating={product.rating || 1}
                />
              );
            })}
          </>
        )}

        {activeTab === TabList.cart && (
          <>
            {cartProducts.map((item) => {
              return (
                <Product
                  key={item.id}
                  href={`${InternalLinks.productDetail(stationId, item.productId)}?quantity=${item.quantity}`}
                  imageUrl={item.product.imageUrl}
                  name={item.product.name}
                  price={item.price}
                  quantity={item.quantity}
                />
              );
            })}
            {cartProducts.length === 0 && (
              <div className="text-center text-gray-500">No products in cart</div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Content;
