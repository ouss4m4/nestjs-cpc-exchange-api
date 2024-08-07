import { Module } from '@nestjs/common';
import { ClickService } from './services/click.service';
import { ClickController } from './click.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Click } from './entities/click.entity';
import { TrafficSourcesModule } from 'src/traffic-sources/traffic-sources.module';
import { CampaignsModule } from 'src/campaigns/campaigns.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Click]),
    TrafficSourcesModule,
    CampaignsModule,
    SharedModule,
  ],
  controllers: [ClickController],
  providers: [ClickService],
  exports: [ClickService, TypeOrmModule],
})
export class ClickModule {}
