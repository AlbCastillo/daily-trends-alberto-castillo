import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateFeedArticleDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  summary?: string;

  @IsUrl()
  url: string;
}
export class CreateFeedDto {
  @IsString()
  newspaper: string;

  articles: CreateFeedArticleDto[];
}
