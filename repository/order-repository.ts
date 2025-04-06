import { OrderStatus } from '@prisma/client';
import BaseRepository from './base-repository';
import { OrderWithRounds } from './types';

class OrderRepository extends BaseRepository {
  async getStationOrder(id: number): Promise<OrderWithRounds | null> {
    return this.prisma.order.findFirst({
      where: {
        stationId: id,
        status: {
          equals: OrderStatus.open,
        },
      },
      include: {
        rounds: {
          where: {
            closedAt: null,
          },
        },
      },
    });
  }

  async openOrder(stationId: number): Promise<OrderWithRounds> {
    return this.prisma.order.create({
      data: {
        stationId,
        status: OrderStatus.open,
        rounds: {
          create: [
            {
              closedAt: null,
            },
          ],
        },
      },
      include: {
        rounds: true,
      },
    });
  }
}

export const orderRepository = new OrderRepository();
