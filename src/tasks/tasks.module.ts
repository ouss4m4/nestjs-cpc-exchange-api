import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskSchedulerService } from './schedulers/task-scheduler.service';
import { GenerateClickRollup } from './rollups/generate-click-rollup.service';
import { BuildCampaignCache } from './cache-structure/build-campaign-cache.service';
import { CampaignsModule } from 'src/campaigns/campaigns.module';

@Module({
  imports: [ScheduleModule.forRoot(), CampaignsModule],
  providers: [GenerateClickRollup, BuildCampaignCache, TaskSchedulerService],
})
export class TasksModule {}
