import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { LandersService } from './landers.service';
import { CreateLanderDto } from './dto/create-lander.dto';
import { UpdateLanderDto } from './dto/update-lander.dto';
import { FindManyOptions, FindOptionsWhere } from 'typeorm';
import { Lander } from './entities/lander.entity';
import { findAllLandersDTO } from './types';

@Controller('landers')
export class LandersController {
  constructor(private readonly landersService: LandersService) {}

  @Post()
  create(@Body() createLanderDto: CreateLanderDto) {
    return this.landersService.create(createLanderDto);
  }

  @Get()
  findAll(@Query() query: findAllLandersDTO) {
    const where: FindOptionsWhere<Lander> = {};
    if (query.advId) {
      where['clientId'] = Number(query.advId);
    }
    if (query.status) {
      where['status'] = Number(query.status);
    }
    let skip = 0;
    if (query.page > 1) {
      skip = (query.page - 1) * 10;
    }

    let order: Record<string, string> = { updatedAt: 'DESC' };
    if (query.sortBy && query.sortBy != 'updatedAt') {
      order = {};
      order[query.sortBy] = query.order == 'asc' ? 'ASC' : 'DESC';
    }

    const findOptions: FindManyOptions<Lander> = {
      relations: ['client'],
      take: 10,
      skip,
      order,
      where,
      select: {
        client: {
          id: true,
          name: true,
          status: true,
        },
      },
    };
    return this.landersService.findAll(findOptions);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.landersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLanderDto: UpdateLanderDto) {
    return this.landersService.update(+id, updateLanderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.landersService.remove(+id);
  }

  @Patch(':id/restore')
  @HttpCode(204)
  restore(@Param('id') id: string) {
    return this.landersService.restore(+id);
  }
}
