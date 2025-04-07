'use client';
import { closeRound } from '@/actions/cart-actions';
import Button from '@/components/button';
import Product from '@/components/product';
import Tabs from '@/components/tabs';
import { CartProduct } from '@/repository/types';
import { InternalLinks } from '@/utils/constants';
import { FloppyDisk } from '@phosphor-icons/react';
import Prisma from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import React, { FC, useState } from 'react';
import Toast from 'react-hot-toast';

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
  const [loading, setLoading] = useState(false);

  const handleCloseRound = async () => {
    setLoading(true);
    const { ok, message } = await closeRound(stationId);
    setLoading(false);
    if (ok) {
      Toast.success(String(message));
    } else {
      Toast.error(String(message));
    }
  };

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
            {cartProducts.length === 0 ? (
              <div className="text-center text-gray-500">No products in cart</div>
            ) : (
              <div className="mt-4 flex items-center justify-center">
                <Button color="primary" size="large" onClick={handleCloseRound} loading={loading}>
                  <FloppyDisk size={20} weight="bold" />
                  Close Round
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Content;
