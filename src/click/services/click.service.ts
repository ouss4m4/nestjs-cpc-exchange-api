import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { IpService } from './ip.service';
import { UserAgentService } from './userAgent.service';
import { CreateClickDto } from '../dto/create-click.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Click } from '../entities/click.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClickService {
  constructor(
    @InjectRepository(Click)
    private clickRepo: Repository<Click>,
    private userAgentService: UserAgentService,
    private ipService: IpService,
  ) {}
  handleClick(request: Request) {
    const ua = this.userAgentService.extractUserAgent(request);
    const ip = this.ipService.extractIp(request);
    // Extract full URL
    const protocol = request.protocol;
    const host = request.get('host');
    const originalUrl = request.originalUrl;
    const fullUrl = `${protocol}://${host}${originalUrl}`;

    // Combine the extracted data and perform the necessary logic

    const clickData: Partial<CreateClickDto> = {
      publisherId: 1,
      trafficSourceId: 1,
      advertiserId: 1,
      campaignId: 4,
      landerId: 3,
      ip,
      ua,
      url: fullUrl,
      redirect: 'https://google.com',
    };
    const click = this.clickRepo.create(clickData);
    this.clickRepo.save(click);
    return clickData.redirect;
  }
}
