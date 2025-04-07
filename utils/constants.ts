export const InternalLinks = {
  home: '/',
  stations: '/stations',
  orders: '/orders',
  productDetail: (stationId: number, productId: string) =>
    `/stations/${stationId}/products/${productId}`,
  orderDetail: (orderId: string) => `/orders/${orderId}`,
};

export const DefaultFormatDate = 'dd/MM/yyyy';
