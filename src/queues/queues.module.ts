import { BullModule } from '@nestjs/bullmq';
import { forwardRef, Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { ProcessPostbackJob } from './jobs/process-postback.job';
import { ClickModule } from 'src/click/click.module';
import { PostbackModule } from 'src/postback/postback.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: '127.0.0.1',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'postback-jobs',
    }),
    forwardRef(() => ClickModule),
    forwardRef(() => PostbackModule),
  ],
  providers: [ProcessPostbackJob, QueueService],
  exports: [QueueService],
})
export class QueuesModule {}
