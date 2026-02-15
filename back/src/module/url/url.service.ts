import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SHORT_URL_REPOSITORY } from '../data/data.symbols';
import { nanoid } from 'nanoid';
import { type IShortUrlRepository } from '../data/short-url/short-url.repository';
import { UrlSafetyService } from '../security/url-safety/url-safety.service';
import { URL_ERROR_KEYS } from './url.constant';

@Injectable()
export class UrlService {
  constructor(
    @Inject(SHORT_URL_REPOSITORY)
    private readonly urlRepository: IShortUrlRepository,
    private readonly urlSafetyService: UrlSafetyService,
  ) { }

  async create(originalUrl: string) {
    const isSafe = await this.verifyUrlSafety(originalUrl);
    if (!isSafe) {
      throw new BadRequestException(URL_ERROR_KEYS.UNSAFE_URL);
    }

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

  async verifyUrlSafety(originalUrl: string) {
    return this.urlSafetyService.checkUrlSafety(originalUrl);
  }

  async getOriginalUrl(shortCode: string) {
    const url = await this.urlRepository.findByShortCode(shortCode);
    if (!url) {
      throw new NotFoundException('Short URL not found');
    }
    return {
      shortCode: url.shortCode,
      originalUrl: url.originalUrl,
      createdAt: url.createdAt,
    };
  }

  private static generateShortCode(): string {
    return nanoid(7);
  }
}
