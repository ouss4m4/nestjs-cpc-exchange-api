import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countryRepo: Repository<Country>,
  ) {}
  findAll() {
    return this.countryRepo.find();
  }

  findOne(id: number) {
    return this.countryRepo.findOneBy({ id });
  }

  findOneByName(name: string) {
    return this.countryRepo.findOneBy({ name });
  }
}
