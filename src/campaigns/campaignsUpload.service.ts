/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from './entities/campaign.entity';
import { Repository } from 'typeorm';
import { CampaignCountry } from './entities/campaign-countries.entity';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { ICampaignUploadCsvRow } from './types';
import { LandersService } from 'src/landers/landers.service';
import { ClientsService } from 'src/clients/clients.service';
import { DeviceService } from 'src/device/device.service';
import { Device } from 'src/device/entities/device.entity';
import { CountriesService } from 'src/countries/countries.service';
@Injectable()
export class CampaignsUploadService {
  constructor(
    @InjectRepository(Campaign)
    private campaignRepo: Repository<Campaign>,
    @InjectRepository(CampaignCountry)
    private campaignCountryRepo: Repository<CampaignCountry>,
    private readonly landerService: LandersService,
    private readonly clientService: ClientsService,
    private readonly deviceService: DeviceService,
    private readonly countryRepo: CountriesService,
  ) {}
  async processCsvFile(
    filePath: string,
  ): Promise<{ success: boolean; errors: []; message: string }> {
    const csvStream = createReadStream(filePath).pipe(parse({ columns: true }));

    const campaigns: Campaign[] = [];
    for await (const row of csvStream) {
      try {
        const campaign = await this.mapCsvRowToCampaign(row);
        campaigns.push(campaign);
      } catch (error) {
        console.error(error);
      }
    }

    console.log(campaigns);
    await this.campaignRepo.save(campaigns);
    await this.campaignCountryRepo.save(campaigns[0].countries);
    return {
      success: true,
      errors: [],
      message: 'file processed',
    };
  }

  async mapCsvRowToCampaign(csvRow: ICampaignUploadCsvRow): Promise<Campaign> {
    const lander = await this.landerService.findOneByName(csvRow.Lander);
    const advertiser = await this.clientService.findOneByName(
      csvRow.Advertiser,
    );

    // format devices
    const formattedDevices: Device[] = [];
    const deviceNames = csvRow.Devices.split(',');
    const devices = await Promise.all(
      deviceNames.map(async (name) => {
        return await this.fetchAndFormatDeviceByName(name);
      }),
    );
    formattedDevices.push(...devices);
    const campaign = new Campaign();

    // build campaignCountries
    const countryNames = csvRow.Countries.split(',');
    const countries = await Promise.all(
      countryNames.map(async (name) => {
        return await this.countryRepo.findOneByName(name);
      }),
    );
    const campaignCoutries: CampaignCountry[] = [];
    countries.forEach((country) => {
      const campaignCountry = new CampaignCountry();
      campaignCountry.campaign = campaign;
      campaignCountry.country = country;
      campaignCoutries.push(campaignCountry);
    });
    campaign.name = csvRow.Name;
    campaign.advertiserId = advertiser.id;
    campaign.landerId = lander.id;
    campaign.device = formattedDevices;
    campaign.countries = campaignCoutries;
    return campaign;
  }

  async fetchAndFormatDeviceByName(name: string): Promise<Device> {
    return await this.deviceService.findOneByName(name);
  }
}
