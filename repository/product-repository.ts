import { Product } from '@prisma/client';
import BaseRepository from './base-repository';
import { CartProduct } from './types';

export class ProductRepository extends BaseRepository {
  async getAll(): Promise<Product[]> {
    return this.prisma.product.findMany({ orderBy: { name: 'asc' } });
  }

  async getById(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async create(data: Omit<Product, 'id'>): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async getCartProducts(stationId: number): Promise<CartProduct[]> {
    const station = await this.prisma.station.findFirst({
      where: {
        id: stationId,
      },
      include: {
        orders: {
          where: {
            status: 'open',
          },
          include: {
            rounds: {
              where: {
                closedAt: null,
              },
              include: {
                items: {
                  include: {
                    product: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!station) {
      return [];
    }
    const order = station.orders[0];
    if (!order) {
      return [];
    }
    const round = order.rounds[0];
    if (!round) {
      return [];
    }
    return round.items;
  }

  async getCartProduct(stationId: number, productId: string): Promise<CartProduct | null> {
    const station = await this.prisma.station.findFirst({
      where: {
        id: stationId,
      },
      include: {
        orders: {
          where: {
            status: 'open',
          },
          include: {
            rounds: {
              where: {
                closedAt: null,
              },
              include: {
                items: {
                  where: { productId },
                  include: {
                    product: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!station) {
      return null;
    }
    const order = station.orders[0];
    if (!order) {
      return null;
    }
    const round = order.rounds[0];
    if (!round) {
      return null;
    }
    return round.items[0] || null;
  }
}

export const productRepository = new ProductRepository();
