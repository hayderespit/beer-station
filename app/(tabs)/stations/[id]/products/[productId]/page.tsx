import BackButton from '@/components/back-button';
import Container from '@/components/container';
import { productRepository } from '@/repository/product-repository';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import ProductDetail from './components/product-detail';

export default async function Page({
  params,
}: {
  params: Promise<{ id: number; productId: string }>;
}) {
  const { id, productId } = await params;
  const product = await productRepository.getById(productId);

  if (!product) {
    redirect(`/stations/${id}`);
  }

  return (
    <Container className="flex h-screen flex-col pb-16 sm:px-0">
      <div className="relative h-[50vh] w-full rounded-lg bg-gray-200">
        <Image src={product.imageUrl} alt={product.name} className="object-cover" fill priority />

        <BackButton className="absolute top-4 left-4 text-white" />
        <div className="absolute -bottom-1 left-0 h-6 w-full rounded-t-3xl bg-white" />
      </div>

      <ProductDetail product={product} stationId={id} />
    </Container>
  );
}
