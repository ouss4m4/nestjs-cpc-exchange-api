import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { IpService } from '../../shared/services/ip.service';
import { UserAgentService } from '../../shared/services/userAgent.service';
import { CreateClickDto } from '../dto/create-click.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Click } from '../entities/click.entity';
import { Repository } from 'typeorm';
import { TrafficSourcesService } from 'src/traffic-sources/traffic-sources.service';
import { GetActiveCampaignsService } from 'src/shared/services/get-active-campaigns.service';

@Injectable()
export class ClickService {
  constructor(
    @InjectRepository(Click)
    private clickRepo: Repository<Click>,
    private userAgentService: UserAgentService,
    private ipService: IpService,
    private tsService: TrafficSourcesService,
    private getActiveCampaigns: GetActiveCampaignsService,
  ) {}
  async handleClick(request: Request) {
    const ua = this.userAgentService.extractUserAgent(request);
    const ip = this.ipService.extractIp(request);

    const traffic_source = await this.tsService.findOneByUuid(
      request.params.ts_uuid,
    );

    const campaign = await this.getActiveCampaigns.getActiveCampaigns();

    const protocol = request.protocol;
    const host = request.get('host');
    const originalUrl = request.originalUrl;
    const fullUrl = `${protocol}://${host}${originalUrl}`;

    // Combine the extracted data and perform the necessary logic

    const clickData: CreateClickDto = {
      publisherId: traffic_source.publisher.id,
      trafficSourceId: traffic_source.id,
      advertiserId: campaign.advertiser.id,
      campaignId: campaign.id,
      landerId: campaign.lander.id,
      ip,
      ua,
      url: fullUrl,
      revenue: '0',
      payout: '0',
      redirect: 'https://google.com',
      status: 1,
    };
    const click = this.clickRepo.create(clickData);
    this.clickRepo.save(click);
    return clickData.redirect;
  }
  async findOneByUuid(uuid: string) {
    const click = await this.clickRepo.findOneBy({ uuid });
    if (!click) {
      throw new NotFoundException(`Click with UUID ${uuid} not found`);
    }
    return click;
  }
  async create(click: Click) {
    return await this.clickRepo.save(click);
  }
}
