'use client';
import { addProductToCart } from '@/app/(tabs)/stations/actions';
import Button from '@/components/button';
import Rating from '@/components/rating';
import { formatCurrency } from '@/utils/helper';
import { Product } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import React, { FC, useState } from 'react';
import Toast from 'react-hot-toast';

type Props = {
  product: Product;
  stationId: number;
};

const ProductDetail: FC<Props> = ({ product, stationId }) => {
  const params = useSearchParams();
  const initialQuantity = params.get('quantity');
  const [quantity, setQuantity] = useState(Number(initialQuantity) || 1);
  const [isLoading, setIsLoading] = useState(false);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    const { ok, message } = await addProductToCart(stationId, product.id, quantity);
    setIsLoading(false);

    if (ok) {
      Toast.success(message as string);
    } else {
      Toast.error(message as string);
    }
  };

  return (
    <div className="px-4">
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-1 flex-col">
          <h1 className="color-black text-xl font-normal">{product.name}</h1>
          <Rating rating={Number(product.rating)} />
        </div>
        <div className="flex flex-row items-center gap-4">
          <button
            onClick={handleDecrease}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border hover:bg-black hover:text-white">
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={handleIncrease}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border hover:bg-black hover:text-white">
            +
          </button>
        </div>
      </div>

      <p className="text-manatee mt-4">{product.description}</p>

      <div className="mt-10 flex flex-row justify-between">
        <div>
          <p className="text-manatee text-base">Price</p>
          <p className="text-lg text-black">{formatCurrency(product.price)}</p>
        </div>

        <Button color="primary" className="w-36" onClick={handleAddToCart} loading={isLoading}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
