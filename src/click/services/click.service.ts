import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { IpService } from './ip.service';
import { UserAgentService } from './userAgent.service';

@Injectable()
export class ClickService {
  constructor(
    private userAgentService: UserAgentService,
    private ipService: IpService,
  ) {}
  handleClick(request: Request) {
    const userAgent = this.userAgentService.extractUserAgent(request);
    const ip = this.ipService.extractIp(request);
    const queryParams = request.query;

    // Combine the extracted data and perform the necessary logic
    console.log('User-Agent:', userAgent);
    console.log('IP Address:', ip);
    console.log('Query Params:', queryParams);
    return `https://google.com?min=da`;
  }
}
