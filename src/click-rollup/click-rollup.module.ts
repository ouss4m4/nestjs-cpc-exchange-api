import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RollupCampaignDay } from './entities/rollup-campaign-day.entity';
import { ClickModule } from 'src/click/click.module';
import { GenerateClickRollupHour } from './generate-click-rollup-hour.service';
import { GenerateClickRollupDay } from './generate-click-rollup-day.service';

@Module({
  imports: [TypeOrmModule.forFeature([RollupCampaignDay]), ClickModule],
  exports: [GenerateClickRollupHour, GenerateClickRollupDay],
  providers: [GenerateClickRollupHour, GenerateClickRollupDay],
})
export class ClickRollupModule {}
