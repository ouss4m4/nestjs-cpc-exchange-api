// tasks/schedulers/task-scheduler.service.ts
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BuildCampaignCache } from '../cache-structure/build-campaign-cache.service';
import { GenerateClickRollup } from '../rollups/generate-click-rollup.service';

@Injectable()
export class TaskSchedulerService {
  constructor(
    private readonly buildCampaignCache: BuildCampaignCache,
    private readonly clickRollupService: GenerateClickRollup,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  handleCacheCron() {
    this.buildCampaignCache.buildCache();
  }

  @Cron(CronExpression.EVERY_MINUTE)
  handleClickRollupCron() {
    this.clickRollupService.performRollup();
  }
}
