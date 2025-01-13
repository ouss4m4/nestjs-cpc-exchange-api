import { Transform, Type } from 'class-transformer';
import { IsOptional, IsInt, IsString, IsEnum } from 'class-validator';

export class FindAllCampaignsDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Transform(({ value, obj }) => value ?? obj.advId) // Transform "advId" to "advertiserId"
  advertiserId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Transform(({ value }) => value) // No setter needed
  landerId?: number;

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

export interface ICampaignUploadCsvRow {
  Name: string;
  Status: string;
  Advertiser: string;
  Lander: string;
  Countries: string;
  Devices: string;
}
