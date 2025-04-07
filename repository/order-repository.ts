import { Order, OrderStatus } from '@prisma/client';
import BaseRepository from './base-repository';
import { OrderWithRoundItemProducts, OrderWithRoundItems, OrderWithRounds } from './types';

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

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order | null> {
    return this.prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }

  async payOrder(id: string, total: number): Promise<Order | null> {
    return this.prisma.order.update({
      where: {
        id,
      },
      data: {
        total,
        status: OrderStatus.payed,
      },
    });
  }

  async getAllWithRounds(): Promise<OrderWithRoundItems[]> {
    return this.prisma.order.findMany({
      include: {
        rounds: {
          include: {
            items: true,
          },
        },
      },
    });
  }

  async getWithRounds(id: string): Promise<OrderWithRoundItemProducts | null> {
    return this.prisma.order.findFirst({
      where: {
        id,
      },
      include: {
        rounds: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
  }
}

export const orderRepository = new OrderRepository();
