import { Transform, Type } from 'class-transformer';
import {
  IsOptional,
  IsInt,
  IsString,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';

export class FindAllCampaignsDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Transform(({ value, obj }) => {
    return value ?? obj?.advId;
  })
  advId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Transform(({ value }) => value) // No setter needed
  lander?: number;

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
  @IsInt()
  @Type(() => Number)
  pageSize?: number;

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

export class DeviceDTO {
  @IsNotEmpty()
  @IsEnum([1, 2, 3])
  id: number;

  @IsNotEmpty()
  @IsEnum(['Mobile', 'Desktop', 'Tablet'])
  name: string;
}
