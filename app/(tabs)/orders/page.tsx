import Container from '@/components/container';
import Content from './components/content';
import { orderRepository } from '@/repository/order-repository';

export default async function Page() {
  const orders = await orderRepository.getAllWithRounds();
  return (
    <Container className="flex h-screen flex-col pb-16">
      <div className="py-6 pl-4">
        <h1 className="text-2xl font-semibold text-black">Your Orders</h1>
        <p className="text-manatee text-md font-normal">Wait for the best meal</p>
      </div>

      <Content orders={orders} />
    </Container>
  );
}
