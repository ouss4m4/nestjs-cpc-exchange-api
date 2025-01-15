import { DeviceDTO } from './../types';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCampaignDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  landerId: number;

  @IsNotEmpty()
  advertiserId: number;

  @IsNotEmpty()
  countries: number[];

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => DeviceDTO)
  device: DeviceDTO[];
}
