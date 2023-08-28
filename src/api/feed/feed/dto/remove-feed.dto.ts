import { IsMongoId } from 'class-validator';

export class RemoveFeedDto {
  @IsMongoId()
  id: string;
}
