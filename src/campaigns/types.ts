import { Transform, Type } from 'class-transformer';
import { IsOptional, IsInt, IsString, IsEnum } from 'class-validator';

export class FindAllCampaignsDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Transform(({ obj }) => obj.advId) // Maps "advId" to "advertiserId" url => domain
  set advId(value: number) {
    this.advertiserId = value;
  }
  advertiserId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  status?: number;

  @IsOptional()
  @IsInt({ message: 'wtf is this' })
  @Type(() => Number)
  country?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  device?: number;

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
