import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateShortenedUrlParams } from './short-url.repository.type';
import { ShortUrl } from '../data.type';

export interface IShortUrlRepository {
  create(data: CreateShortenedUrlParams): Promise<ShortUrl>;
  findByShortCode(shortCode: string): Promise<ShortUrl | null>;
}

@Injectable()
export class ShortUrlRepository implements IShortUrlRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateShortenedUrlParams): Promise<ShortUrl> {
    return this.prisma.shortUrl.create({
      data,
    });
  }

  async findByShortCode(shortCode: string): Promise<ShortUrl | null> {
    return this.prisma.shortUrl.findUnique({
      where: { shortCode },
    });
  }
}
