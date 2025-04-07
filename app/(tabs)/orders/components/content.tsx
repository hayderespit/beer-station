'use client';
import Order from '@/components/order';
import Tabs from '@/components/tabs';
import { OrderWithRoundItems } from '@/repository/types';
import { formatDate } from '@/utils/date';
import { OrderStatus } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import React, { FC, useMemo, useState } from 'react';

type Props = {
  orders: OrderWithRoundItems[];
};

enum TabList {
  inprogress = 'inprogress',
  past = 'past',
}

const Content: FC<Props> = ({ orders }) => {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<string>(tabParam || TabList.inprogress);

  const { inprogress, past } = useMemo(() => {
    const orderList = orders.map((order: OrderWithRoundItems) => ({
      id: order.id,
      stationId: order.stationId,
      numberOfRounds: order.rounds.length,
      createdAt: order.createdAt,
      status: order.status,
      totalPrice: order.rounds.reduce(
        (sum, round) => sum + round.items.reduce((itemSum, item) => itemSum + item.price, 0),
        0,
      ),
    }));

    const inprogress = orderList.filter((order) => {
      return order.status === OrderStatus.open;
    });

    const past = orderList.filter((order) => {
      return order.status !== OrderStatus.open;
    });

    return { inprogress, past };
  }, [orders]);

  return (
    <>
      <Tabs onChange={setActiveTab} activeTab={activeTab}>
        <Tabs.Tab id={TabList.inprogress} label="In Progress" />
        <Tabs.Tab id={TabList.past} label="Past Orders" />
      </Tabs>

      <div className="flex flex-col gap-2 px-4">
        {activeTab === TabList.inprogress && (
          <>
            {inprogress.map((order) => {
              return (
                <Order
                  key={order.id}
                  stationId={order.stationId}
                  totalPrice={order.totalPrice}
                  numberOfRounds={order.numberOfRounds}
                />
              );
            })}
            {inprogress.length === 0 && (
              <div className="text-manatee text-center">No orders in progress</div>
            )}
          </>
        )}

        {activeTab === TabList.past && (
          <>
            {past.map((order) => {
              return (
                <Order
                  key={order.id}
                  stationId={order.stationId}
                  totalPrice={order.totalPrice}
                  numberOfRounds={order.numberOfRounds}
                  date={formatDate(order.createdAt, 'MMM dd hh:mm a')}
                />
              );
            })}
            {past.length === 0 && <div className="text-manatee text-center">No past orders</div>}
          </>
        )}
      </div>
    </>
  );
};

export default Content;
