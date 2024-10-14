import { ModuleMetadata } from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { HealthChecksConfig } from './health-checks-config.interface';
import { AppConfigOptions } from './app-config-options.interface';
import { MemoryConfig } from './memory-config.interface';

export interface CommonModuleOptions {
  memoryConfig: MemoryConfig;
  healthChecks?: HealthChecksConfig;
}

export interface CommonModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  appConfig: AppConfigOptions;
  useFactory: {
    default: (...args: any[]) => CommonModuleOptions | Promise<CommonModuleOptions>;
    jwt?: (...args: any[]) => JwtModuleOptions | Promise<JwtModuleOptions>;
    mongoose: (...args: any[]) => MongooseModuleFactoryOptions | Promise<MongooseModuleFactoryOptions>;
  };
  inject: { jwt?: any[]; mongoose: any[]; default?: any[] };
}