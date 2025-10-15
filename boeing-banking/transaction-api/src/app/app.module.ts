import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsV1Module } from './transactions/transactions.v1.module';
import { TransactionsV2Module } from './transactions/transactions.v2.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TransactionsV1Module, TransactionsV2Module,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get<string>('DB_HOST'),
        port: cfg.get<number>('DB_PORT'),
        username: cfg.get<string>('DB_USER'),
        password: cfg.get<string>('DB_PASS'),
        database: cfg.get<string>('DB_NAME'),
        autoLoadEntities: true,                          // picks up @Entity classes
        synchronize: cfg.get('TYPEORM_SYNC') === 'true', // dev only!
        // logging: ['schema', 'error'], // handy in dev
      }),
    }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
