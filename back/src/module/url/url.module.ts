import { Module, Global } from '@nestjs/common';
import { DataModule } from '../data/data.module';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { SecurityModule } from '../security/security.module';
import { HttpModule } from '../http/http.module';

@Global()
@Module({
  imports: [
    DataModule,
    SecurityModule,
    HttpModule,
  ],
  providers: [UrlService],
  controllers: [UrlController],
})
export class UrlModule { }
