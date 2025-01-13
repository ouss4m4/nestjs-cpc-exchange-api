import { Injectable } from '@nestjs/common';
import { Device } from './entities/device.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private deviceRepo: Repository<Device>,
  ) {}

  findAll() {
    return this.deviceRepo.find();
  }

  findOne(id: number) {
    return this.deviceRepo.findBy({ id });
  }

  findOneByName(name: string) {
    return this.deviceRepo.findOneBy({ name });
  }
}
