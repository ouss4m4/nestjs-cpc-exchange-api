/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const client = this.clientsRepository.create(createClientDto);

    return await this.clientsRepository.save(client);
  }

  async findAll(query: { type?: string; status?: string }) {
    const where: Record<string, any> = {};

    if (query.type) {
      where.type = query.type;
    }

    if (query.status) {
      where.status = query.status;
    }

    return await this.clientsRepository.find({ where, withDeleted: true });
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  async findOneByName(name: string) {
    const client = await this.clientsRepository.findOneBy({ name });
    if (!client) {
      throw new NotFoundException(`client with name ${name} not found`);
    }
    return client;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
