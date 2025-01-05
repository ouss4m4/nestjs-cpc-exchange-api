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

@Controller('landers')
export class LandersController {
  constructor(private readonly landersService: LandersService) {}

  @Post()
  create(@Body() createLanderDto: CreateLanderDto) {
    return this.landersService.create(createLanderDto);
  }

  @Get()
  findAll(
    @Query('clientId') clientId: string,
    @Query('status') status: string,
  ) {
    const where: FindOptionsWhere<Lander> = {};
    if (clientId) {
      where['clientId'] = Number(clientId);
    }
    if (status) {
      where['status'] = Number(status);
    }

    const findOptions: FindManyOptions<Lander> = {
      withDeleted: true,
      relations: ['client'],
      take: 20,
      order: {
        id: 'DESC',
      },
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
