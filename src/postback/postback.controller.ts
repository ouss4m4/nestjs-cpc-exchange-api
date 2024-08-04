/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Param, Req } from '@nestjs/common';
import { PostbackService } from './postback.service';
import { Request } from 'express';
import { CreatePostbackDto } from './dto/create-postback.dto';
import { ClickService } from 'src/click/services/click.service';

@Controller('postback')
export class PostbackController {
  constructor(
    private readonly clickService: ClickService,
    private readonly postbackService: PostbackService,
  ) {}

  @Get()
  async findOne(@Req() request: Request) {
    // analyse request, check that click uuid exist
    // prepare pb data
    // dispatch a job that updates the click
    // same job updates the postback
    // const click: CreatePostbackDto = ;

    // find the click or throw
    // return ;
    try {
      const uuid = request.query.transaction_id;
      const revenue = request.query.payout;
      const protocol = request.protocol;
      const host = request.get('host');
      const originalUrl = request.originalUrl;
      const fullUrl = `${protocol}://${host}${originalUrl}`;
      if (typeof uuid != 'string' || typeof revenue != 'string') {
        throw 'uuid/payout error';
      }
      const click = await this.clickService.findOneByUuid(uuid);
      const postbackDto: CreatePostbackDto = {
        clickId: click.id,
        transactionId: click.uuid,
        publisherId: click.publisherId,
        trafficSourceId: click.trafficSourceId,
        advertiserId: click.advertiserId,
        campaignId: click.campaignId,
        landerId: click.landerId,
        ip: click.ip,
        revenue,
        ua: click.ua,
        url: fullUrl,
        status: 1,
      };
      return await this.postbackService.createPostback(postbackDto);
    } catch (error) {
      return error;
    }
  }
}
