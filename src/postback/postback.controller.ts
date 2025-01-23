import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PostbackJobProducer } from 'src/queues/postback/postback-producer.service';
import { Public } from 'src/auth/constants';

@Controller('postback')
export class PostbackController {
  constructor(private readonly pbJob: PostbackJobProducer) {}

  @Public()
  @Get()
  findOne(@Req() request: Request, @Res() res: Response) {
    const uuid = request.query.transaction_id;
    const revenue = request.query.payout;
    const protocol = request.protocol;
    const host = request.get('host');
    const originalUrl = request.originalUrl;
    const fullUrl = `${protocol}://${host}${originalUrl}`;
    if (typeof uuid != 'string' || typeof revenue != 'string') {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'transaction_id and payout are required',
      });
    }

    this.pbJob.dispatch({
      transaction_id: uuid,
      payout: revenue,
      url: fullUrl,
    });

    return res.status(200).json({ status: 200, success: true });
  }
}
