import { Module } from '@nestjs/common';
import { CampaignsModule } from 'src/campaigns/campaigns.module';
import { GetActiveCampaignsService } from './services/get-active-campaigns.service';
import { IpService } from './services/ip.service';
import { UserAgentService } from './services/userAgent.service';

@Module({
  imports: [CampaignsModule],
  providers: [GetActiveCampaignsService, IpService, UserAgentService],
  exports: [GetActiveCampaignsService, IpService, UserAgentService],
})
export class SharedModule {}
