import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrafficSourceDto } from './dto/create-traffic-source.dto';
import { UpdateTrafficSourceDto } from './dto/update-traffic-source.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrafficSource } from './entities/traffic-source.entity';

@Injectable()
export class TrafficSourcesService {
  constructor(
    @InjectRepository(TrafficSource)
    private trafficSourceRepo: Repository<TrafficSource>,
  ) {}
  async create(createTrafficSourceDto: CreateTrafficSourceDto) {
    const trafficSource = this.trafficSourceRepo.create(createTrafficSourceDto);
    try {
      return await this.trafficSourceRepo.save(trafficSource);
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    return await this.trafficSourceRepo.findAndCount({
      withDeleted: true,
      relations: ['publisher'],
    });
  }

  async findOne(id: number) {
    const trafficSource = await this.trafficSourceRepo.findOne({
      where: { id },
      withDeleted: true,
    });
    if (!trafficSource) {
      throw new NotFoundException(`Traffic Source with ID ${id} not found`);
    }
    return trafficSource;
  }

  async findOneByUuid(uuid: string) {
    const trafficSource = await this.trafficSourceRepo.findOne({
      where: { uuid },
      relations: ['publisher'],
    });
    if (!trafficSource) {
      throw new NotFoundException(`Traffic Source with UUID ${uuid} not found`);
    }
    return trafficSource;
  }

  async update(id: number, updateTrafficSourceDto: UpdateTrafficSourceDto) {
    const trafficSource = await this.findOne(id);
    if (!trafficSource) {
      throw new NotFoundException(`Traffic Source with ID ${id} not found`);
    }
    Object.assign(trafficSource, updateTrafficSourceDto);
    try {
      return await this.trafficSourceRepo.save(trafficSource);
    } catch (error) {
      return error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} trafficSource`;
  }
}
