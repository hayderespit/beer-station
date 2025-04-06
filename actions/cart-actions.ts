'use server';
import { orderRepository } from '@/repository/order-repository';
import { productRepository } from '@/repository/product-repository';
import { roundRepository } from '@/repository/round-repository';
import { getErrorMessage } from '@/utils/helper';
import logger from '@/utils/logger';
import { revalidatePath } from 'next/cache';

export async function addProductToCart(stationId: number, productId: string, quantity: number) {
  try {
    const product = await productRepository.getById(productId);
    if (!product) {
      return { ok: false, message: 'Product not found' };
    }

    let order = await orderRepository.getStationOrder(Number(stationId));
    if (!order) {
      order = await orderRepository.openOrder(Number(stationId));
    }

    if (order.rounds.length) {
      await roundRepository.upsertProduct({
        productId,
        roundId: order.rounds[0].id,
        quantity,
        price: product.price,
      });
    }

    revalidatePath('/stations');
    revalidatePath(`/stations/${stationId}`);

    return { ok: true, order };
  } catch (error) {
    logger.error('Error adding product to cart', error);
    return { ok: false, message: getErrorMessage(error) };
  }
}
