import BackButton from '@/components/back-button';
import { productRepository } from '@/repository/product-repository';
import ProductList from './components/product-list';
import Container from '@/components/container';

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const products = await productRepository.getAll();

  return (
    <Container className="flex h-screen flex-col pb-16">
      <div className="flex flex-row items-center py-6">
        <BackButton />
        <h1 className="flex-1 text-2xl font-bold">Station #{id}</h1>
      </div>

      <ProductList products={products} stationId={id} />
    </Container>
  );
}
