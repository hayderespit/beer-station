import Link from 'next/link';
import React, { FC } from 'react';

type StationProps = {
  number: number;
  orderId?: string;
};

const Station: FC<StationProps> = (props) => {
  const { number, orderId } = props;
  const bgColor = orderId ? 'bg-green-200 dark:bg-green-700' : 'bg-gray-200 dark:bg-gray-700';

  return (
    <Link
      href={`/stations/${number}`}
      className={`flex h-24 w-24 items-center justify-center rounded-lg bg-gray-200 active:bg-gray-300 dark:bg-gray-700 ${bgColor}`}>
      Station {number}
    </Link>
  );
};

export default Station;
