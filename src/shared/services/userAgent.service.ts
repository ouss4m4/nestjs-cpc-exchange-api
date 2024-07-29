import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class UserAgentService {
  extractUserAgent(request: Request): string {
    return request.headers['user-agent'];
  }
}
