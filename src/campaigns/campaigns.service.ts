import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Brackets, Repository } from 'typeorm';
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

  async findAll({
    advertiserId,
    status,
    country,
  }: {
    advertiserId?: number;
    status?: number;
    country?: number;
  }) {
    const queryBuilder = this.campaignRepo.createQueryBuilder('campaign');

    // Include related entities
    queryBuilder
      .leftJoinAndSelect('campaign.advertiser', 'advertiser')
      .leftJoinAndSelect('campaign.lander', 'lander')
      .leftJoinAndSelect('campaign.countries', 'campaignCountries')
      .leftJoinAndSelect('campaignCountries.country', 'countryEntity');

    // Add filters based on query parameters
    if (advertiserId) {
      queryBuilder.andWhere('campaign.advertiserId = :advertiserId', {
        advertiserId: Number(advertiserId),
      });
    }

    if (status) {
      queryBuilder.andWhere('campaign.status = :status', {
        status: Number(status),
      });
    }

    if (country && country !== 1) {
      // Ensure the specified country is associated
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where(
            'EXISTS (SELECT 1 FROM campaign_countries cc WHERE cc.campaign_id = campaign.id AND cc.country_id = :country)',
            {
              country: Number(country),
            },
          ).orWhere('campaignCountries.country = 1');
        }),
      );
    }

    return queryBuilder.getMany();
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
