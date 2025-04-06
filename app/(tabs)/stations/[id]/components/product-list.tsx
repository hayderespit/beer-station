'use client';
import Product from '@/components/product';
import Tabs from '@/components/tabs';
import { InternalLinks } from '@/utils/constants';
import Prisma from '@prisma/client';
import React, { FC, useState } from 'react';

enum TabList {
  products = 'products',
  cart = 'cart',
}

type Props = {
  stationId: number;
  products: Prisma.Product[];
};

const ProductList: FC<Props> = (props) => {
  const { products, stationId } = props;
  const [activeTab, setActiveTab] = useState<string>(TabList.products);

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
          <div>
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <p>Your shopping cart is empty.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
