import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { Public } from 'src/auth/constants';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Public()
  @Get()
  findAll() {
    return this.countriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countriesService.findOne(+id);
  }
}
