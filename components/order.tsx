import { formatCurrency } from '@/utils/helper';
import React, { FC } from 'react';

type Props = {
  stationId: number;
  date?: string;
  status?: string;
  totalPrice: number;
  numberOfRounds: number;
};

const Order: FC<Props> = (props) => {
  const { stationId, totalPrice, numberOfRounds, date, status } = props;
  return (
    <div className="text-manatee flex cursor-pointer flex-row items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-50 active:bg-gray-50">
      {/* <div className="border-manatee flex h-14 w-14 flex-col items-center justify-center rounded-lg border p-0.5">
        <p className="text-manatee text-xs">Station </p>
        <p className="text-sm">{stationId}</p>
      </div> */}
      <div>
        <p className="text-black">Station {stationId}</p>
        <p className="text-sm">
          {numberOfRounds} Rounds • {formatCurrency(totalPrice)}
        </p>
      </div>
      <div>
        <p className="text-xs">{date}</p>
        <p className="text-xs">{status}</p>
      </div>
    </div>
  );
};

export default Order;
