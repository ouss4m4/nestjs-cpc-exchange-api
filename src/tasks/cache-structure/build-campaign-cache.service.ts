import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisClientType } from 'redis';
// import { CampaignsService } from 'src/campaigns/campaigns.service';
import { Campaign } from 'src/campaigns/entities/campaign.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BuildCampaignCache {
  constructor(
    @InjectRepository(Campaign)
    private campaignRepo: Repository<Campaign>,
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  async buildCache(): Promise<void> {
    console.log('starting cache');
    const campaigns = await this.campaignRepo.find({
      where: { status: 1 },
    });
    this.redisClient.set('active-campaigns', JSON.stringify(campaigns));
  }
}
