import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { Campaign } from './entities/campaign.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignCountry } from './entities/campaign-countries.entity';
import { CampaignsUploadService } from './campaignsUpload.service';
import { ClientsModule } from 'src/clients/clients.module';
import { LandersModule } from 'src/landers/landers.module';
import { DeviceModule } from 'src/device/device.module';
import { CountriesModule } from 'src/countries/countries.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Campaign, CampaignCountry]),
    ClientsModule,
    LandersModule,
    DeviceModule,
    CountriesModule,
  ],
  controllers: [CampaignsController],
  providers: [CampaignsService, CampaignsUploadService],
  exports: [CampaignsService],
})
export class CampaignsModule {}
