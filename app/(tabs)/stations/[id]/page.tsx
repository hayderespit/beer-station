import BackButton from '@/components/back-button';
import Product from '@/components/product';
import { InternalLinks } from '@/utils/constants';

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-row items-center py-6">
        <BackButton />
        <h1 className="text-center text-2xl font-bold">Station #{id}</h1>
      </div>

      <Product
        href={InternalLinks.productDetail(id, '2323')}
        imageUrl="https://qcnxhjmqmiyvztfdigwo.supabase.co/storage/v1/object/public/products//club-colombia.webp"
        name="Pilsener"
        price={10000}
        rating={4.3}
      />
      {/* <Product
        href={InternalLinks.productDetail(id, '23e23')}
        imageUrl="https://qcnxhjmqmiyvztfdigwo.supabase.co/storage/v1/object/public/products//club-colombia.webp"
        name="Club Colombia"
        price={10000}
        rating={4.3}
      />
      <Product
        href={InternalLinks.productDetail(id, '23e23')}
        imageUrl="https://qcnxhjmqmiyvztfdigwo.supabase.co/storage/v1/object/public/products//club-colombia.webp"
        name="Club Colombia"
        price={10000}
        rating={4.3}
      /> */}
    </div>
  );
}
