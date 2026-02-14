import { IsDate, IsNotEmpty, IsString, IsUrl } from '@nestjs/class-validator';

export class CreateUrlDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  originalUrl: string;
}

export class ShortUrlResponseDto {
  @IsString()
  @IsNotEmpty()
  shortCode: string;

  @IsString()
  @IsNotEmpty()
  originalUrl: string;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
}