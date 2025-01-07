import { Client } from 'src/clients/entities/client.entity';
import { Country } from 'src/countries/entities/country.entity';
import { Device } from 'src/device/entities/device.entity';
import { Lander } from 'src/landers/entities/lander.entity';

export interface ICampaignListReponse {
  data: ICampaign[];
  rowsCount: number;
}

export interface ICampaign {
  id: number;

  name: string;

  advertiserId: number;

  landerId: number;

  device: Device[];

  status: number;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;

  lander: Lander;

  advertiser: Client;

  countries: Country[];
}
