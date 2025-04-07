import { Prisma } from '@prisma/client';

export type StationWithOrders = Prisma.StationGetPayload<{
  include: {
    orders: {
      select: {
        id: true;
      };
    };
  };
}>;

export type OrderWithRounds = Prisma.OrderGetPayload<{
  include: {
    rounds: true;
  };
}>;

export type OrderWithRoundItems = Prisma.OrderGetPayload<{
  include: {
    rounds: {
      include: {
        items: true;
      };
    };
  };
}>;

export type OrderWithRoundItemProducts = Prisma.OrderGetPayload<{
  include: {
    rounds: {
      include: {
        items: {
          include: {
            product: true;
          };
        };
      };
    };
  };
}>;

export type CartProduct = Prisma.RoundProductGetPayload<{
  include: {
    product: true;
  };
}>;
