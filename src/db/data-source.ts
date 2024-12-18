import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

// Load .env file
dotenv.config();
console.log('----');
console.log(process.env.DB_USERNAME);
console.log('----');

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
  logging: true,
});

// export default AppDataSource;
