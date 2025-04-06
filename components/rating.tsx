import { Star } from '@phosphor-icons/react/dist/ssr';
import React, { FC } from 'react';

const Rating: FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="text-primary flex w-28 flex-row items-center justify-start">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={16}
          weight={'fill'}
          className={index < Math.round(rating) ? 'text-primary-500' : 'text-gallery'}
        />
      ))}

      <span className="text-manatee pl-2">{rating}</span>
    </div>
  );
};

export default Rating;
