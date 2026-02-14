import {
	Post,
	Body,
	Controller,
	Get,
	Param,
	Redirect,
	NotFoundException,
	HttpCode,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './url.dto';

@Controller({ path: 'short-urls' })
export class UrlController {
	constructor(private readonly urlService: UrlService) { }

	@Post()
	@HttpCode(201)
	create(@Body() { originalUrl }: CreateUrlDto) {
		return this.urlService.create(originalUrl);
	}

	@Get(':shortCode')
	@Redirect()
	async redirect(@Param('shortCode') shortCode: string) {
		const originalUrl = await this.urlService.getOriginalUrl(shortCode);
		return { url: originalUrl, statusCode: 302 };
	}
}
