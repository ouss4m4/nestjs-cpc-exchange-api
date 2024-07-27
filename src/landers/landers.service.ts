/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return this.landerRepository.findOneBy({ id });
  }

  update(id: number, updateLanderDto: UpdateLanderDto) {
    return `This action updates a #${id} lander`;
  }

  remove(id: number) {
    return `This action removes a #${id} lander`;
  }
}
