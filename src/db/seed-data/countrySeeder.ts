import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source';
import { createReadStream } from 'fs';
import { join } from 'path';
import { parse } from 'fast-csv';
import { Country } from '../../countries/entities/country.entity';

const seedCountries = async () => {
  const dataSource: DataSource = await AppDataSource.initialize();
  const countryRepo = dataSource.getRepository(Country);
  const countryCsvStream = createReadStream(
    join(__dirname, 'countries.csv'),
  ).pipe(parse({ headers: true, ignoreEmpty: true }));

  for await (const row of countryCsvStream) {
    const country = countryRepo.create({
      id: row.id,
      iso: row.iso,
      name: row.name,
      niceName: row.nicename,
    });
    await countryRepo.save(country);
  }
  return 'Country seed success';
};

seedCountries()
  .then((sf) => {
    console.log(sf);
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(0);
  });
