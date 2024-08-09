import { BullModule } from '@nestjs/bullmq';
import { forwardRef, Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { ProcessPostbackJob } from './jobs/process-postback.job';
import { ClickModule } from 'src/click/click.module';
import { PostbackModule } from 'src/postback/postback.module';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: '127.0.0.1',
        port: 6379,
      },
      defaultJobOptions: {
        attempts: 2,
        removeOnComplete: {
          age: 300,
          count: 100,
        },
        backoff: {
          delay: 120000,
          type: 'fixed',
        },
        removeOnFail: {
          age: 60 * 60 * 24,
        },
      },
    }),
    BullModule.registerQueue({
      name: 'postback-jobs',
    }),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter,
    }),
    BullBoardModule.forFeature({
      name: 'postback-jobs',
      adapter: BullMQAdapter, //or use BullAdapter if you're using bull instead of bullMQ
    }),
    forwardRef(() => ClickModule),
    forwardRef(() => PostbackModule),
  ],
  providers: [ProcessPostbackJob, QueueService],
  exports: [QueueService],
})
export class QueuesModule {}
