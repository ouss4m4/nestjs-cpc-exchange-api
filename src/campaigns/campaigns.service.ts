import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Repository } from 'typeorm';
import { Campaign } from './entities/campaign.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CampaignCountry } from './entities/campaign-countries.entity';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private campaignRepo: Repository<Campaign>,
    @InjectRepository(CampaignCountry)
    private campaignCountryRepo: Repository<CampaignCountry>,
  ) {}
  async create(createCampaignDto: CreateCampaignDto) {
    const { countries, ...campaignData } = createCampaignDto;

    const campaign = this.campaignRepo.create(campaignData);

    try {
      const savedCampaign = await this.campaignRepo.save(campaign);

      if (countries && countries.length > 0) {
        const campaignCountries = countries.map((countryId: number) => {
          return this.campaignCountryRepo.create({
            campaign: savedCampaign,
            country: { id: countryId } as any, // Assuming `countryId` is an array of country IDs
          });
        });

        await this.campaignCountryRepo.save(campaignCountries);
      }

      return savedCampaign;
    } catch (error) {
      return error;
    }
  }

  async findAll(relations: string[] = []) {
    return await this.campaignRepo.find({
      withDeleted: true,
      relations: ['lander', 'advertiser', 'countries.country', ...relations],
      select: {
        id: true,
        name: true,
        landerId: true,
        advertiserId: true,
        status: true,
        lander: {
          id: true,
          name: true,
        },
        advertiser: {
          id: true,
          name: true,
        },
        countries: {
          id: true, // Select fields for the pivot table if needed
          country: {
            id: true, // Only include specific fields from `country`
            name: true,
            niceName: true,
          },
        },
      },
    });
  }

  async findOne(
    id: number,
    relations: string[] = ['countries.country', 'lander', 'advertiser'],
  ) {
    const campaign = await this.campaignRepo.findOne({
      where: { id },
      withDeleted: true,
      relations,
    });
    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }
    return campaign;
  }

  async update(id: number, updateCampaignDto: UpdateCampaignDto) {
    const { countries, ...campaignData } = updateCampaignDto;

    const campaign = await this.findOne(id);
    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }

    Object.assign(campaign, campaignData);

    try {
      const updatedCampaign = await this.campaignRepo.save(campaign);

      // TODO: all countries should be handled in validation?
      if (countries && countries.length > 0) {
        // Remove existing associations
        await this.campaignCountryRepo.delete({ campaign: { id } });

        // Add new associations
        const campaignCountries = countries.map((countryId: number) => {
          return this.campaignCountryRepo.create({
            campaign: updatedCampaign,
            country: { id: countryId } as any,
          });
        });

        await this.campaignCountryRepo.save(campaignCountries);
      }

      return updatedCampaign;
    } catch (error) {
      return error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} campaign`;
  }
}
