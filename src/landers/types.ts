import { Type } from 'class-transformer';
import { IsInt, IsEnum, IsString, IsOptional } from 'class-validator';

export class findAllLandersDTO {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  clientId: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  status?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  order?: string;
}
