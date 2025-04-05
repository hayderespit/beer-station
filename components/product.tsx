import { InternalLinks } from '@/utils/constants';
import { formatCurrency } from '@/utils/helper';
import { Star } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

type Props = {
  imageUrl: string;
  name: string;
  price: number;
  rating: number;
  href: string;
};

const Product: FC<Props> = (props) => {
  const { imageUrl, name, price, rating, href } = props;

  return (
    <Link
      href={href}
      className="flex cursor-pointer flex-row items-center gap-4 rounded-lg px-2 py-2 hover:bg-gray-50">
      <figure className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-50 md:h-24 md:w-24">
        <Image src={imageUrl} alt={name} className="object-cover" fill priority />
      </figure>

      <div className="flex flex-1 flex-col">
        <h2 className="text-md">{name}</h2>
        <p className="text-manatee">{formatCurrency(price)}</p>
      </div>

      <div className="text-primary flex flex-row items-center">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            size={16}
            weight={'fill'}
            className={index < Math.round(rating) ? 'text-primary-500' : 'text-gallery'}
          />
        ))}

        <span className="pl-2">{rating}</span>
      </div>
    </Link>
  );
};

export default Product;
