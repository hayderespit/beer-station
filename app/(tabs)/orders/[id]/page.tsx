import BackButton from '@/components/back-button';
import Container from '@/components/container';
import { orderRepository } from '@/repository/order-repository';
import { formatCurrency } from '@/utils/helper';
import ProceedPaymentBtn from './components/proceed-payment-btn';
import { OrderStatus } from '@prisma/client';
import CancelBtn from './components/cancel-btn';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await orderRepository.getWithRounds(id);
  let total = 0;
  for (const round of order?.rounds ?? []) {
    for (const item of round.items) {
      total += item.price * item.quantity;
    }
  }

  return (
    <Container className="flex h-screen flex-col pb-16">
      <div className="flex flex-row items-center py-6">
        <BackButton />
        <div>
          <h1 className="flex-1 text-2xl font-bold">Payment</h1>
          <p className="text-manatee text-sm">You deserve better beers</p>
        </div>
      </div>

      <div className="flex-col px-4">
        <p className="pb-4 text-lg font-semibold text-black">
          Order {id.substring(0, 7).toLocaleUpperCase()}
        </p>

        {order?.rounds.map((round, index) => (
          <div key={round.id} className="mb-4">
            <p className="text-black">Round {index + 1}</p>
            {round.items.map((item) => (
              <div className="flex flex-row items-center pb-1" key={item.id}>
                <p className="text-manatee flex-1">
                  {item.product.name} x {item.quantity} und. {formatCurrency(item.price)}
                </p>
                <p className="text-right"> {formatCurrency(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
        ))}

        <div className="flex flex-row items-center justify-between border-t border-gray-200 pt-4">
          <p className="text-lg font-semibold">Total</p>
          <p className="text-success text-lg font-semibold">{formatCurrency(total)}</p>
        </div>

        {order?.status.includes(OrderStatus.open) && (
          <div className="mt-6 flex flex-row justify-between">
            <CancelBtn orderId={id} />
            {!!total && <ProceedPaymentBtn orderId={id} />}
          </div>
        )}
      </div>
    </Container>
  );
}
