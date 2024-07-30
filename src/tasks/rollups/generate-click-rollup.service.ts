import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateClickRollup {
  constructor() {}

  async performRollup(): Promise<void> {
    console.log('starting rollup');
    // const campaigns = await this.campService.findAll(['lander', 'advertiser']);
    // this.redisClient.set('active-campaigns', JSON.stringify(campaigns));
    console.log('Done');
  }
}
