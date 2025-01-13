import { Module } from '@nestjs/common';
import { LandersService } from './landers.service';
import { LandersController } from './landers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lander } from './entities/lander.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lander])],
  controllers: [LandersController],
  providers: [LandersService],
  exports: [LandersService],
})
export class LandersModule {}
