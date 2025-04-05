import { OrderStatus, Prisma, Station } from '@prisma/client';
import BaseRepository from './base-repository';
import { StationWithOrders } from './types';

class StationRepository extends BaseRepository {
  async create(data: Prisma.StationUncheckedCreateInput): Promise<Station> {
    return this.prisma.station.create({
      data,
    });
  }

  async getById(id: number): Promise<Station | null> {
    return this.prisma.station.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.StationUncheckedUpdateInput): Promise<Station> {
    return this.prisma.station.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Station> {
    return this.prisma.station.delete({
      where: { id },
    });
  }

  async getAllWithOrder(): Promise<StationWithOrders[]> {
    return this.prisma.station.findMany({
      include: {
        orders: {
          select: { id: true },
          where: {
            status: {
              equals: OrderStatus.open,
            },
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
  }
}

export const stationRepository = new StationRepository();
