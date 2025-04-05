import BackButton from '@/components/back-button';

export default function Page() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-row items-center py-6">
        <BackButton />
        <h1 className="text-center text-2xl font-bold">Producto X</h1>
      </div>
    </div>
  );
}
