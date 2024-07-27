import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LandersService } from './landers.service';
import { CreateLanderDto } from './dto/create-lander.dto';
import { UpdateLanderDto } from './dto/update-lander.dto';

@Controller('landers')
export class LandersController {
  constructor(private readonly landersService: LandersService) {}

  @Post()
  create(@Body() createLanderDto: CreateLanderDto) {
    return this.landersService.create(createLanderDto);
  }

  @Get()
  findAll() {
    return this.landersService.findAll();
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
}
