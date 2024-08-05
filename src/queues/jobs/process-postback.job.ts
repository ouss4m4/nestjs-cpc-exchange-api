import { Processor, WorkerHost } from '@nestjs/bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bullmq';
import { Click } from 'src/click/entities/click.entity';
import { CreatePostbackDto } from 'src/postback/dto/create-postback.dto';
import { Postback } from 'src/postback/entities/postback.entity';
import { Repository } from 'typeorm';

@Processor('postback-jobs')
export class ProcessPostbackJob extends WorkerHost {
  constructor(
    @InjectRepository(Click)
    private clickRepo: Repository<Click>,
    @InjectRepository(Postback)
    private postbackRepo: Repository<Postback>,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { transaction_id, payout, url } = job.data;

    const click = await this.clickRepo.findOneBy({ uuid: transaction_id });

    click.revenue = payout;
    click.payout = (payout * 0.8).toFixed(2);
    this.clickRepo.save(click);

    const postbackDto: CreatePostbackDto = {
      clickId: click.id,
      transactionId: click.uuid,
      publisherId: click.publisherId,
      trafficSourceId: click.trafficSourceId,
      advertiserId: click.advertiserId,
      campaignId: click.campaignId,
      landerId: click.landerId,
      ip: click.ip,
      revenue: payout,
      ua: click.ua,
      url,
      status: 1,
    };
    // this.postbackRepo.save(postbackDto);
    // Perform your job logic here
    console.dir(postbackDto);
  }
}
