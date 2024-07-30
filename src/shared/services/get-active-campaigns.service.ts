import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { CampaignsService } from 'src/campaigns/campaigns.service';
import { Campaign } from 'src/campaigns/entities/campaign.entity';

@Injectable()
export class GetActiveCampaignsService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
    private campService: CampaignsService,
  ) {}

  async getActiveCampaigns(): Promise<Campaign> {
    const cachedValue = await this.redisClient.get('active-campaigns');
    if (cachedValue) {
      const activeCampaigns = JSON.parse(cachedValue);
      return activeCampaigns[
        Math.floor(Math.random() * activeCampaigns.length)
      ];
    }
    // TODO: call the build campaign cache dont do it here
    const activeCampaigns = await this.campService.findAll([
      'lander',
      'advertiser',
    ]);

    if (activeCampaigns.length > 0) {
      await this.redisClient.set(
        'active-campaigns',
        JSON.stringify(activeCampaigns),
      );
      return activeCampaigns[
        Math.floor(Math.random() * activeCampaigns.length)
      ];
    }

    return null;
  }
}
