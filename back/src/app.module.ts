import { Module } from '@nestjs/common';
import { PrismaModule } from './module/prisma/prisma.module';
import { DataModule } from './module/data/data.module';
import { UrlModule } from './module/url/url.module';
import { HttpModule } from './module/http/http.module';
import { SecurityModule } from './module/security/security.module';

@Module({
  imports: [
    PrismaModule,
    DataModule,
    UrlModule,
    HttpModule,
    SecurityModule
  ],
})
export class AppModule { }
