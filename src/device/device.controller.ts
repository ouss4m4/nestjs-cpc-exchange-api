import { Controller, Get, Param } from '@nestjs/common';
import { DeviceService } from './device.service';
import { Public } from 'src/auth/constants';

@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Public()
  @Get()
  findAll() {
    return this.deviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceService.findOne(+id);
  }
}
