'use server';
import { orderRepository } from '@/repository/order-repository';
import { getErrorMessage } from '@/utils/helper';
import logger from '@/utils/logger';
import { OrderStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function payOrder(orderId: string) {
  try {
    const order = await orderRepository.getWithRounds(orderId);

    let total = 0;
    for (const round of order?.rounds ?? []) {
      for (const item of round.items) {
        total += item.price * item.quantity;
      }
    }

    const response = await orderRepository.payOrder(orderId, total);
    if (response) {
      revalidatePath(`/orders/${orderId}`);
      revalidatePath('/orders');
      return { ok: true, message: 'Order payed successfully' };
    }

    throw new Error('Failed to update order status');
  } catch (error) {
    logger.error('Error closing round', error);
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function cancelOrder(orderId: string) {
  try {
    const response = await orderRepository.updateOrderStatus(orderId, OrderStatus.cancelled);
    if (response) {
      revalidatePath(`/orders/${orderId}`);
      revalidatePath('/orders');
      return { ok: true, message: 'Order cancelled successfully' };
    }

    throw new Error('Failed to update order status');
  } catch (error) {
    logger.error('Error closing round', error);
    return { ok: false, message: getErrorMessage(error) };
  }
}
