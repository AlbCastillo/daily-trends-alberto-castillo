import { IsMongoId, IsString } from 'class-validator';

import { CreateFeedArticleDto } from './create-feed.dto';

export class UpdateFeedBodyDto {
  @IsString()
  newspaper: string;

  articles: CreateFeedArticleDto[];
}

export class UpdateFeedDto extends UpdateFeedBodyDto {
  @IsMongoId()
  id: string;
}
