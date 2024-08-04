import { IsNotEmpty } from 'class-validator';

export class CreatePostbackDto {
  @IsNotEmpty()
  transactionId: string;

  @IsNotEmpty()
  clickId: number;

  @IsNotEmpty()
  publisherId: number;

  @IsNotEmpty()
  trafficSourceId: number;

  @IsNotEmpty()
  advertiserId: number;

  @IsNotEmpty()
  campaignId: number;

  @IsNotEmpty()
  landerId: number;

  @IsNotEmpty()
  revenue: string;

  url: string;

  ip: string;

  ua: string;

  status: number;
}
