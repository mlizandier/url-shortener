import {
	Post,
	Body,
	Controller,
	Get,
	Param,
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
	async getUrl(@Param('shortCode') shortCode: string) {
		return this.urlService.getOriginalUrl(shortCode);
	}
}
