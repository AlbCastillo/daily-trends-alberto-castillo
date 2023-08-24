import { IsIn, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindFeedInputDto {
  @IsMongoId()
  @IsOptional()
  id?: string;

  @IsOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  newspaper?: string;

  @IsString()
  @IsOptional()
  date?: string;
}

export class ListFeedInputDto {
  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  sort?: 'ASC' | 'DESC';

  @IsString()
  @IsOptional()
  sortField?: string;

  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  page?: number;

  @IsOptional()
  search?: FindFeedInputDto;
}
