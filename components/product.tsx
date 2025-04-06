import { formatCurrency } from '@/utils/helper';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import Rating from './rating';
import { X } from '@phosphor-icons/react/dist/ssr';

type Props = {
  imageUrl: string;
  name: string;
  price: number;
  rating?: number;
  href: string;
  quantity?: number;
};

const Product: FC<Props> = (props) => {
  const { imageUrl, name, price, rating = 1, href, quantity } = props;

  return (
    <div className="relative flex cursor-pointer flex-row items-center gap-4 rounded-lg px-2 py-2 hover:bg-gray-50 active:bg-gray-100">
      <figure className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-50 md:h-24 md:w-24">
        <Image
          src={imageUrl}
          alt={name}
          className="object-cover"
          fill
          priority
          sizes="(max-width: 24rem) 100vw, (max-width: 48rem) 50vw, 33vw"
        />
      </figure>

      <Link href={href} className="flex flex-1 flex-col">
        <h2 className="text-md">{name}</h2>
        <p className="text-manatee">{formatCurrency(price)}</p>
      </Link>

      {quantity ? (
        <span className="text-manatee pr-4 font-normal">{quantity} Items</span>
      ) : (
        <Rating rating={rating} />
      )}

      {!!quantity && (
        <button className="cursor-pointer rounded-full bg-red-500 px-2 py-2 text-xs font-semibold text-white active:opacity-80">
          <X size={16} weight="bold" />
        </button>
      )}
    </div>
  );
};

export default Product;
