import { Module } from '@nestjs/common';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { TaskModule } from './task/task.module';
import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule, ConfigType } from '@nestjs/config';
import Enviroment from './common/env.config';
import { join } from 'path';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Enviroment],
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useFactory: (config: ConfigType<typeof Enviroment>) => {
        const endpoint = join(config.basePath || '', 'graphql');
        const schemaModuleOptions: Partial<GqlModuleOptions> = {
          autoSchemaFile: true,
          sortSchema: true,
        };
        return {
          path: endpoint,
          playground: {
            endpoint: join(config.basePath || '', endpoint),
          },
          introspection: true,
          ...schemaModuleOptions,
        };
      },
      inject: [Enviroment.KEY],
    }),
    TaskModule,
    CommonModule,
  ],
  // controllers: [TaskModule, CommonModule],
  // providers: [TaskService],
})
export class AppModule {}
