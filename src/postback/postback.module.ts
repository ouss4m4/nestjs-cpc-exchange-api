import { Module } from '@nestjs/common';
import { PostbackService } from './postback.service';
import { PostbackController } from './postback.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postback } from './entities/postback.entity';
import { ClickModule } from 'src/click/click.module';

@Module({
  imports: [TypeOrmModule.forFeature([Postback]), ClickModule],
  controllers: [PostbackController],
  providers: [PostbackService],
})
export class PostbackModule {}
