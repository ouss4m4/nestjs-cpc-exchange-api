import { IsNotEmpty } from 'class-validator';

export class CreateCampaignDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  landerId: number;

  @IsNotEmpty()
  advertiserId: number;
}
