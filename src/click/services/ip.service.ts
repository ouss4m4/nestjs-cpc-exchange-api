import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class IpService {
  extractIp(request: Request): string {
    return request.ip;
  }
}
