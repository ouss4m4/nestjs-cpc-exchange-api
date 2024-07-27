import { Module } from '@nestjs/common';
import { TrafficSourcesService } from './traffic-sources.service';
import { TrafficSourcesController } from './traffic-sources.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrafficSource } from './entities/traffic-source.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrafficSource])],
  controllers: [TrafficSourcesController],
  providers: [TrafficSourcesService],
})
export class TrafficSourcesModule {}
