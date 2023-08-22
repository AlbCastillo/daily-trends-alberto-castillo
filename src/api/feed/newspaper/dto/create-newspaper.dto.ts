import { IsString } from 'class-validator';

export class CreateNewspaperDto {
  @IsString()
  name: string;
}
