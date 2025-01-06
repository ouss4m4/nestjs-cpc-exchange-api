import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';

@Module({
  controllers: [DeviceController],
  providers: [DeviceService],
  imports: [TypeOrmModule.forFeature([Device])],
})
export class DeviceModule {}
