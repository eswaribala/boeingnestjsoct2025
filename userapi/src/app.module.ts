import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BigIntResolver } from 'graphql-scalars';

@Module({
  imports: [UsersModule, GraphQLModule.forRoot<ApolloDriverConfig>({
    autoSchemaFile: 'schema.gql',
    driver: ApolloDriver,
    playground: true,
    sortSchema: true,
    path: '/graphql',
    resolvers: {BigInt: BigIntResolver}
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
