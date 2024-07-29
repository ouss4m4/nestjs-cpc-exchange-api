import { Injectable } from '@nestjs/common';
import { CampaignsService } from 'src/campaigns/campaigns.service'; // Adjust the import path as necessary
import { Campaign } from 'src/campaigns/entities/campaign.entity';

@Injectable()
export class GetActiveCampaignsService {
  constructor(private readonly campaignsService: CampaignsService) {}

  async getActiveCampaigns(): Promise<Campaign> {
    const activeCampaigns = await this.campaignsService.findAll([
      'lander',
      'advertiser',
    ]);

    return activeCampaigns[Math.floor(Math.random() * activeCampaigns.length)];
  }
}
