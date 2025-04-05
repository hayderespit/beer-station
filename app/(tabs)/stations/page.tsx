import Station from '@/components/station';
import { stationRepository } from '@/repository/station-repository';

export default async function Page() {
  const stations = await stationRepository.getAllWithOrder();
  return (
    <div className="flex h-full flex-col">
      <h1 className="py-6 text-center text-2xl font-bold">Stations</h1>

      <section className="flex flex-row flex-wrap justify-around gap-4 md:px-4">
        {stations.map((station) => {
          const orderId = station.orders[0]?.id;
          return <Station key={station.id} number={station.id} orderId={orderId} />;
        })}
      </section>
    </div>
  );
}
