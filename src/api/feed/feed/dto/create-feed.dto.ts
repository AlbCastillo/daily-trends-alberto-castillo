import { IsString, IsUrl } from 'class-validator';

export class CreateFeedArticleDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsUrl()
  link: string;
}
export class CreateFeedDto {
  @IsString()
  name: string;

  articles: CreateFeedArticleDto[];
}
