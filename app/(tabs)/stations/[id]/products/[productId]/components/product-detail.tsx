'use client';
import Button from '@/components/button';
import Rating from '@/components/rating';
import { formatCurrency } from '@/utils/helper';
import { Product } from '@prisma/client';
import React, { FC, useState } from 'react';

type Props = {
  product: Product;
};

const ProductDetail: FC<Props> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
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

        <Button color="primary" className="w-36">
          Order Now
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
