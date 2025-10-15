import 'dotenv/config';
import { DataSource } from 'typeorm';


export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  //entities: [Customer, Address],
  migrations: ['dist/migrations/*.js'],
});
