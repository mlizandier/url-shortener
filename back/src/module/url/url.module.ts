import { Module, Global } from '@nestjs/common';
import { DataModule } from '../data/data.module';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';

@Global()
@Module({
  imports: [DataModule],
  providers: [UrlService],
  controllers: [UrlController],
})
export class UrlModule {}
