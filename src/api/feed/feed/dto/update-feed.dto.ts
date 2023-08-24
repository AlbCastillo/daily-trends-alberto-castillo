import { IsMongoId } from 'class-validator';

import { CreateFeedArticleDto } from './create-feed.dto';

export class UpdatedInputDto {
  @IsMongoId()
  id: string;

  articles: CreateFeedArticleDto[];
}
