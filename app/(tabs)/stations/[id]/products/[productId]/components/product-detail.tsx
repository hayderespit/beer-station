'use client';
import { addProductToCart } from '@/actions/cart-actions';
import Button from '@/components/button';
import Rating from '@/components/rating';
import { formatCurrency } from '@/utils/helper';
import { Product } from '@prisma/client';
import React, { FC, useState } from 'react';

type Props = {
  product: Product;
  stationId: number;
};

const ProductDetail: FC<Props> = ({ product, stationId }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    const response = await addProductToCart(stationId, product.id, quantity);
    setIsLoading(false);
    console.log('>> response:', response);
    if (response.ok) {
      // Handle success (e.g., show a success message or update the cart)
    } else {
      // Handle error (e.g., show an error message)
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

        <Button color="primary" className="w-36" onClick={handleAddToCart} disabled={isLoading}>
          {isLoading ? (
            <svg
              className="h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12zm2.5-1h11a2.5 2.5 0 1 1 0-5h-11a2.5 2.5 0 1 1 0-5h11a7.5 7.5 0 1 1-15 .001A7.5 7.5 0 0 1 6.5 11z"
              />
            </svg>
          ) : (
            'Add to Cart'
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
