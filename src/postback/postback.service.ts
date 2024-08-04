import { Injectable } from '@nestjs/common';
import { CreatePostbackDto } from './dto/create-postback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Postback } from './entities/postback.entity';

@Injectable()
export class PostbackService {
  constructor(
    @InjectRepository(Postback)
    private postbackRepo: Repository<Postback>,
  ) {}
  async createPostback(createPostbackDto: CreatePostbackDto) {
    const pb = this.postbackRepo.create(createPostbackDto);
    return await this.postbackRepo.save(pb);
  }
}
