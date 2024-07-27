import { IsNotEmpty } from 'class-validator';

export class CreateCampaignDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  landerId: number;

  @IsNotEmpty()
  clientId: number;
}
