/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Redirect, Req } from '@nestjs/common';
import { ClickService } from './services/click.service';
import { Request } from 'express';
import { Public } from 'src/auth/constants';

@Controller('click')
export class ClickController {
  constructor(private readonly clickService: ClickService) {}

  @Public()
  @Get(':ts_uuid')
  @Redirect()
  async in(@Req() request: Request) {
    try {
      const redirectUrl = await this.clickService.handleClick(request);

      return { url: redirectUrl };
    } catch (error) {
      return error;
    }
  }
}
