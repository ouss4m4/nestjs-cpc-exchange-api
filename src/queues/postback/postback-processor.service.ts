import { Processor, WorkerHost } from '@nestjs/bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bullmq';
import { Click } from 'src/click/entities/click.entity';
import { CreatePostbackDto } from 'src/postback/dto/create-postback.dto';
import { Postback } from 'src/postback/entities/postback.entity';
import { Repository } from 'typeorm';

@Processor('postback-jobs')
export class PostbackProcessor extends WorkerHost {
  constructor(
    @InjectRepository(Click) private clickRepo: Repository<Click>,
    @InjectRepository(Postback) private pbRepo: Repository<Postback>,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { transaction_id, payout, url } = job.data;
    console.log('processing postback for click uuid: ' + transaction_id);
    const click = await this.clickRepo.findOneBy({ uuid: transaction_id });
    if (!click) {
      console.error('click not found');
    }
    click.revenue = payout;
    click.payout = (payout * 0.8).toFixed(2);
    await this.clickRepo
      .save(click)
      .then(() => console.log('Click saved successfully'))
      .catch((error) => console.error('Error saving click:', error));

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
    await this.pbRepo
      .save(postbackDto)
      .then(() => console.log('Postback saved successfully'))
      .catch((error) => console.error('Error saving postback:', error));
    console.log('job processed');
  }
}
