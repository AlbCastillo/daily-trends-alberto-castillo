import { IsMongoId } from 'class-validator';

import { CreateFeedArticleDto } from './create-feed.dto';

export class UpdateFeedDto {
  @IsMongoId()
  id: string;

  articles: CreateFeedArticleDto[];
}
