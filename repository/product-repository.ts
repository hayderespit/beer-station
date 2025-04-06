import { Product } from '@prisma/client';
import BaseRepository from './base-repository';

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
}

export const productRepository = new ProductRepository();
