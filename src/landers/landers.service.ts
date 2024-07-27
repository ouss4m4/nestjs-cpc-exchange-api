/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLanderDto } from './dto/create-lander.dto';
import { UpdateLanderDto } from './dto/update-lander.dto';
import { Lander } from './entities/lander.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisClientType } from 'redis';

@Injectable()
export class LandersService {
  /**
   *
   */
  constructor(
    @InjectRepository(Lander)
    private landerRepository: Repository<Lander>,
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  async create(createLanderDto: CreateLanderDto) {
    const lander = this.landerRepository.create(createLanderDto);
    try {
      return await this.landerRepository.save(lander);
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    return await this.landerRepository.find({
      withDeleted: true,
    });
  }

  async findOne(id: number) {
    const lander = await this.landerRepository.findOne({
      where: { id },
      withDeleted: true,
    });
    if (!lander) {
      throw new NotFoundException(`Lander with ID ${id} not found`);
    }
    return lander;
  }

  async update(id: number, updateLanderDto: UpdateLanderDto) {
    const lander = await this.findOne(id);
    if (!lander) {
      throw new NotFoundException(`Lander with ID ${id} not found`);
    }
    Object.assign(lander, updateLanderDto);
    try {
      return await this.landerRepository.save(lander);
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    const lander = await this.findOne(id); // Reuse findOne to check if the entity exists
    if (!lander) {
      throw new NotFoundException(`Lander with ID ${id} not found`);
    }
    try {
      await this.landerRepository.softDelete(id);
      return { deleted: true };
    } catch (error) {
      return error;
    }
  }

  async restore(id: number) {
    const lander = await this.findOne(id);
    if (!lander) {
      throw new NotFoundException(`Lander with ID ${id} not found`);
    }
    try {
      await this.landerRepository.restore(id);
      return { restored: true };
    } catch (error) {
      return error;
    }
  }
}
