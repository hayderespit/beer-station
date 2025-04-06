export const formatCurrency = (value: number): string => {
  return `${new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)}`;
};

export const getErrorMessage = (error: unknown) => {
  return error instanceof Error ? error.message : error?.toString();
};
