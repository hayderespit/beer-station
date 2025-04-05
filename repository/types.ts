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
