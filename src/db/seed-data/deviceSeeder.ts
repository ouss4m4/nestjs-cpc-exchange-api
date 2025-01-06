import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Device } from 'src/device/entities/device.entity';

const seedDevices = async () => {
  const dataSource: DataSource = await AppDataSource.initialize();
  const deviceRepo = dataSource.getRepository(Device);

  const devices: Device[] = [
    { id: 1, name: 'Desktop', slug: 'desktop' },
    { id: 2, name: 'Mobile', slug: 'mobile' },
    { id: 3, name: 'Tablet', slug: 'tablet' },
  ];
  for (const device of devices) {
    await deviceRepo.save(device);
  }

  console.log('seeding devices done');
};

seedDevices()
  .then((sf) => {
    console.log(sf);
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(0);
  });
