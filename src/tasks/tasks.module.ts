import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskSchedulerService } from './schedulers/task-scheduler.service';
import { BuildCampaignCache } from './cache-structure/build-campaign-cache.service';
import { CampaignsModule } from 'src/campaigns/campaigns.module';
import { ClickRollupModule } from 'src/click-rollup/click-rollup.module';

@Module({
  imports: [ScheduleModule.forRoot(), CampaignsModule, ClickRollupModule],
  providers: [BuildCampaignCache, TaskSchedulerService],
})
export class TasksModule {}
