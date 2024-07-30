import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { Campaign } from 'src/campaigns/entities/campaign.entity';

@Injectable()
export class GetActiveCampaignsService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  async getActiveCampaigns(): Promise<Campaign> {
    const cachedValue = await this.redisClient.get('active-campaigns');
    if (!cachedValue) {
      return null;
    }
    const activeCampaigns: Campaign[] = JSON.parse(cachedValue);

    return activeCampaigns[Math.floor(Math.random() * activeCampaigns.length)];
  }
}
