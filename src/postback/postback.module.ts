import { forwardRef, Module } from '@nestjs/common';
import { PostbackService } from './postback.service';
import { PostbackController } from './postback.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postback } from './entities/postback.entity';
import { ClickModule } from 'src/click/click.module';
import { QueuesModule } from 'src/queues/queues.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Postback]),
    forwardRef(() => ClickModule),
    forwardRef(() => QueuesModule),
  ],
  controllers: [PostbackController],
  providers: [PostbackService],
  exports: [PostbackService, TypeOrmModule],
})
export class PostbackModule {}
