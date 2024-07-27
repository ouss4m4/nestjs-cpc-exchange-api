import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Repository } from 'typeorm';
import { Campaign } from './entities/campaign.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private campaignRepo: Repository<Campaign>,
  ) {}
  async create(createCampaignDto: CreateCampaignDto) {
    const campaign = this.campaignRepo.create(createCampaignDto);
    try {
      return await this.campaignRepo.save(campaign);
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    return await this.campaignRepo.find({
      withDeleted: true,
    });
  }

  async findOne(id: number) {
    const campaign = await this.campaignRepo.findOne({
      where: { id },
      withDeleted: true,
    });
    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }
    return campaign;
  }

  async update(id: number, updateCampaignDto: UpdateCampaignDto) {
    const campaign = await this.findOne(id);
    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }
    Object.assign(campaign, updateCampaignDto);
    try {
      return await this.campaignRepo.save(campaign);
    } catch (error) {
      return error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} campaign`;
  }
}
