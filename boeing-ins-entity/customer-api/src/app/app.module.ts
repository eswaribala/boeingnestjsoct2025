import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import { AddressesModule } from './addresses/addresses.module';

import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +(process.env.DB_PORT || 5432),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'nestcustomerdb',
      autoLoadEntities: true,   // dev-only; prefer migrations in prod
      synchronize: true,        // dev-only; disable in prod
    }),
    CustomersModule,
 AddressesModule,

    // Subpath mounting: /customers/:customerId/addresses → AddressesModule
    RouterModule.register([
      {
        path: 'customers',
        children: [{ path: ':customerId/addresses', module: CustomersModule }],
      },
    ]),
  ],
})
export class AppModule {}
