import { InternalLinks } from '@/utils/constants';
import { formatCurrency } from '@/utils/helper';
import { OrderStatus } from '@prisma/client';
import Link from 'next/link';
import React, { FC } from 'react';

type Props = {
  id: string;
  stationId: number;
  date?: string;
  status?: string;
  totalPrice: number;
  numberOfRounds: number;
};

const Order: FC<Props> = (props) => {
  const { stationId, totalPrice, numberOfRounds, date, status, id } = props;
  return (
    <Link
      href={InternalLinks.orderDetail(id)}
      className="text-manatee flex cursor-pointer flex-row items-center gap-3 rounded-lg px-4 py-2 hover:bg-gray-50 active:bg-gray-50">
      <div className="border-manatee flex h-14 w-14 flex-col items-center justify-center rounded-lg border p-0.5">
        <p className="text-sm">{stationId}</p>
      </div>

      <div className="flex-1">
        <p className="text-black">Station {stationId}</p>
        <p className="text-sm">
          {numberOfRounds} Rounds • {formatCurrency(totalPrice)}
        </p>
      </div>

      <div>
        <p className="text-right text-xs">{date}</p>
        <p
          className={`text-right text-xs capitalize ${status?.includes(OrderStatus.cancelled) ? 'text-primary' : 'text-success'}`}>
          {status}
        </p>
      </div>
    </Link>
  );
};

export default Order;
