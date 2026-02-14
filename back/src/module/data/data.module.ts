import { Module, Provider } from '@nestjs/common';
import { SHORT_URL_REPOSITORY } from './data.symbols';
import { ShortUrlRepository } from './short-url/short-url.repository';

const repositoryProviders: Provider[] = [
  {
    provide: SHORT_URL_REPOSITORY,
    useClass: ShortUrlRepository,
  },
];

@Module({
  providers: repositoryProviders,
  exports: repositoryProviders,
})
export class DataModule {}
