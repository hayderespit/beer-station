import { Order, OrderStatus, Round, RoundProduct } from '@prisma/client';
import BaseRepository from './base-repository';

class RoundRepository extends BaseRepository {
  async getStationOrder(id: number): Promise<Order | null> {
    return this.prisma.order.findFirst({
      where: {
        stationId: id,
        status: {
          equals: OrderStatus.open,
        },
      },
    });
  }

  async addProduct(data: {
    roundId: string;
    productId: string;
    quantity: number;
    price: number;
  }): Promise<RoundProduct> {
    return this.prisma.roundProduct.create({
      data,
    });
  }

  async upsertProduct(data: {
    roundId: string;
    productId: string;
    quantity: number;
    price: number;
  }): Promise<RoundProduct> {
    const found = await this.prisma.roundProduct.findFirst({
      where: { productId: data.productId, roundId: data.roundId },
    });

    if (found) {
      return this.prisma.roundProduct.update({
        where: {
          id: found.id,
        },
        data: {
          quantity: data.quantity,
          price: data.price,
        },
      });
    } else {
      return this.prisma.roundProduct.create({
        data,
      });
    }
  }

  async openRound(orderId: string): Promise<Round> {
    return this.prisma.round.create({
      data: {
        orderId,
      },
    });
  }

  async closeRound(id: string): Promise<Round> {
    return this.prisma.round.update({
      where: {
        id,
      },
      data: {
        closedAt: new Date(),
      },
    });
  }

  async removeProductCart(id: string): Promise<RoundProduct> {
    return this.prisma.roundProduct.delete({
      where: {
        id,
      },
    });
  }
}

export const roundRepository = new RoundRepository();
