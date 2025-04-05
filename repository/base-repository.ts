import { prisma } from '@/prisma';

export default class BaseRepository {
  protected prisma;

  constructor() {
    this.prisma = prisma;
  }
}
