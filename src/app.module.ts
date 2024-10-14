import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppConfig } from './common/services';


@Module({
  imports: [
    // AdminModule,
    // SupplierModule,
    // UserModule,
    // ProductModule,
    // CartModule,
    // RouterModule.register([{ path: 'admin', module: AdminModule }]),
    // RouterModule.register([{ path: 'supplier', module: SupplierModule }]),
    // RouterModule.register([{ path: 'user', module: UserModule }]),
    // RouterModule.register([{ path: 'product', module: ProductModule }]),
    // RouterModule.register([{ path: 'cart', module: CartModule }]),


    RedisModule.forRootAsync({
      imports: [],
      inject: [AppConfig],
      useFactory: async (appConfig: AppConfig): Promise<RedisModuleOptions> => {
        return {
          config: {
            host: appConfig.REDIS_HOST ?? 'redis',
            port: appConfig.REDIS_PORT,
          },
        };
      },
    }),

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}