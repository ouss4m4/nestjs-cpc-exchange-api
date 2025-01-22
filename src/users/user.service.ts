/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { RedisClientType } from 'redis';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  async findAll() {
    const cachedValue = await this.redisClient.get('users');

    if (cachedValue) {
      return JSON.parse(cachedValue);
    }
    const users = await this.usersRepository.find({
      relations: ['client'],
      relationLoadStrategy: 'query',
    });
    this.redisClient.set('users', JSON.stringify(users));
    return users;
  }

  findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email }).then((user) => {
      if (user) {
        return this.usersRepository.findOne({
          where: { email },
          relations: ['client'],
        });
      }
      return null;
    });
  }

  findOneById(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
