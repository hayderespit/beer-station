import BackButton from '@/components/back-button';
import { productRepository } from '@/repository/product-repository';
import Content from './components/content';
import Container from '@/components/container';

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const products = await productRepository.getAll();
  const cartProducts = await productRepository.getCartProducts(Number(id));

  return (
    <Container className="flex h-screen flex-col pb-16">
      <div className="flex flex-row items-center py-6">
        <BackButton href="/stations" />
        <h1 className="flex-1 text-2xl font-bold">Station #{id}</h1>
      </div>

      <Content products={products} stationId={id} cartProducts={cartProducts} />
    </Container>
  );
}
