export const InternalLinks = {
  home: '/',
  stations: '/stations',
  orders: '/orders',
  productDetail: (stationId: number, productId: string) =>
    `/stations/${stationId}/products/${productId}`,
};

export const DefaultFormatDate = 'dd/MM/yyyy';
