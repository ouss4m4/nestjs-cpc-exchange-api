import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrafficSourcesService } from './traffic-sources.service';
import { CreateTrafficSourceDto } from './dto/create-traffic-source.dto';
import { UpdateTrafficSourceDto } from './dto/update-traffic-source.dto';

@Controller('traffic-sources')
export class TrafficSourcesController {
  constructor(private readonly trafficSourcesService: TrafficSourcesService) {}

  @Post()
  create(@Body() createTrafficSourceDto: CreateTrafficSourceDto) {
    return this.trafficSourcesService.create(createTrafficSourceDto);
  }

  @Get()
  findAll() {
    return this.trafficSourcesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trafficSourcesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrafficSourceDto: UpdateTrafficSourceDto,
  ) {
    return this.trafficSourcesService.update(+id, updateTrafficSourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trafficSourcesService.remove(+id);
  }
}
