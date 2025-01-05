import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { CampaignsService } from 'src/campaigns/campaigns.service';

@Injectable()
export class BuildCampaignCache {
  constructor(
    private campService: CampaignsService,
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  async buildCache(): Promise<void> {
    console.log('starting cache');
    const campaigns = await this.campService.findAll({
      relations: ['lander', 'advertiser'],
    });
    this.redisClient.set('active-campaigns', JSON.stringify(campaigns));
    console.log('Done');
  }
}
