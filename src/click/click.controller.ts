import { Controller, Get, Redirect, Req } from '@nestjs/common';
import { ClickService } from './services/click.service';
import { Request } from 'express';

@Controller('click')
export class ClickController {
  constructor(private readonly clickService: ClickService) {}

  @Get()
  @Redirect()
  in(@Req() request: Request) {
    const redirectUrl = this.clickService.handleClick(request);
    return { url: redirectUrl };
  }
}
