import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';

@Module({
  controllers: [DeviceController],
  imports: [TypeOrmModule.forFeature([Device])],
  providers: [DeviceService],
  exports: [DeviceService],
})
export class DeviceModule {}
