import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Account } from './src/app/transactions/entities/account.entity';
import { Transaction } from './src/app/transactions/entities/transaction.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Account, Transaction],
  migrations: ['dist/migrations/*.js'],
});
