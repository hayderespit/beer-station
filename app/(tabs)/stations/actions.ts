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

    let roundId = order.rounds[0]?.id;

    if (!order.rounds.length) {
      const round = await roundRepository.openRound(order.id);
      roundId = round.id;
    }

    await roundRepository.upsertProduct({
      productId,
      roundId,
      quantity,
      price: product.price,
    });

    revalidatePath('/stations');
    revalidatePath(`/stations/${stationId}`);

    return { ok: true, message: 'Product added to cart successfully' };
  } catch (error) {
    logger.error('Error adding product to cart', error);
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function closeRound(stationId: number) {
  try {
    const order = await orderRepository.getStationOrder(Number(stationId));
    if (!order || !order.rounds.length) {
      return { ok: false, message: 'No open round found for this station' };
    }

    const round = order.rounds[0];
    await roundRepository.closeRound(round.id);

    revalidatePath('/stations');
    revalidatePath(`/stations/${stationId}`);

    return { ok: true, message: 'Round closed successfully' };
  } catch (error) {
    logger.error('Error closing round', error);
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function removeProductFromCart(id: string, stationId: number) {
  try {
    await roundRepository.removeProductCart(id);

    revalidatePath('/stations');
    revalidatePath(`/stations/${stationId}`);

    return { ok: true, message: 'Product removed from cart successfully' };
  } catch (error) {
    logger.error('Error removing product from cart', error);
    return { ok: false, message: getErrorMessage(error) };
  }
}
