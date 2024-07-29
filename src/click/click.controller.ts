/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Redirect, Req } from '@nestjs/common';
import { ClickService } from './services/click.service';
import { Request } from 'express';

@Controller('click')
export class ClickController {
  constructor(private readonly clickService: ClickService) {}

  @Get(':ts_uuid')
  // @Redirect()
  in(@Req() request: Request) {
    try {
      const redirectUrl = this.clickService.handleClick(request);
      return redirectUrl;
    } catch (error) {
      return error;
    }
  }
}
