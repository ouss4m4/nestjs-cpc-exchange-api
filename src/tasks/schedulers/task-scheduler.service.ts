// tasks/schedulers/task-scheduler.service.ts
import { Injectable } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';
import { BuildCampaignCache } from '../cache-structure/build-campaign-cache.service';
import { GenerateClickRollupHour } from 'src/click-rollup/generate-click-rollup-hour.service';
import { GenerateClickRollupDay } from 'src/click-rollup/generate-click-rollup-day.service';

@Injectable()
export class TaskSchedulerService {
  constructor(
    private readonly buildCampaignCache: BuildCampaignCache,
    private readonly rollupHour: GenerateClickRollupHour,
    private readonly rollupDay: GenerateClickRollupDay,
  ) {}

  // @Cron(CronExpression.EVERY_MINUTE)
  // handleCacheCron() {
  //   this.buildCampaignCache.buildCache();
  // }

  // @Cron(CronExpression.EVERY_MINUTE)
  // handleClickRollupHourCron() {
  //   this.rollupHour.execute();
  // }

  // @Cron(CronExpression.EVERY_MINUTE)
  // handleClickRollupDayCron() {
  //   this.rollupDay.execute();
  // }
}
