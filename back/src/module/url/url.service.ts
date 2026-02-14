import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SHORT_URL_REPOSITORY } from '../data/data.symbols';
import { type IShortUrlRepository } from '../data/short-url/short-url.repository';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
  constructor(
    @Inject(SHORT_URL_REPOSITORY)
    private readonly urlRepository: IShortUrlRepository,
  ) { }

  async create(originalUrl: string) {
    const shortCode = UrlService.generateShortCode();
    const shortUrl = await this.urlRepository.create({
      originalUrl,
      shortCode,
    });

    return {
      shortCode: shortUrl.shortCode,
      originalUrl: shortUrl.originalUrl,
      createdAt: shortUrl.createdAt,
    }
  }

  async getOriginalUrl(shortCode: string): Promise<string> {
    const url = await this.urlRepository.findByShortCode(shortCode);
    if (!url) {
      throw new NotFoundException('Short URL not found');
    }
    return url.originalUrl;
  }

  private static generateShortCode(): string {
    return nanoid(7);
  }
}
