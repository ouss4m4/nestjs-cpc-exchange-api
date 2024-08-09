import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class PostbackJobProducer {
  constructor(
    @InjectQueue('postback-jobs') private readonly postbackQueue: Queue,
  ) {}

  async dispatch(data: {
    transaction_id: string;
    payout: string;
    url: string;
  }) {
    await this.postbackQueue.add('postback-job', data);
  }
}
