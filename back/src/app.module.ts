import { Module } from '@nestjs/common';
import { PrismaModule } from './module/prisma/prisma.module';
import { DataModule } from './module/data/data.module';
import { UrlModule } from './module/url/url.module';

@Module({
  imports: [PrismaModule, DataModule, UrlModule],
})
export class AppModule {}
