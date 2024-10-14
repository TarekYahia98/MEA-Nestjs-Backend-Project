import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppConfig } from './common/services';
import { CommonModule } from './common/common.module';


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

    CommonModule.registerAsync({
      appConfig: {
        appShortName: 'mea-project',
      },
      useFactory: {
        default: () => ({
          memoryConfig: {
            minHeapSizeInBytes: 512 * 1024 * 1024,
            maxHeapSizeInBytes: 4096 * 1024 * 1024,
          },
        }),
        mongoose: (appConfig: AppConfig) => ({
          uri: appConfig.MONGODB_URL,
        }),
      },
      inject: {
        mongoose: [AppConfig],
        default: [],
      },
    }),

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