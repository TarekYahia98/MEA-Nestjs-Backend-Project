import { DynamicModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { TerminusModule } from "@nestjs/terminus";
import Module from "module";
import { Connection } from "mongoose";
import { CommonModuleAsyncOptions } from "./interfaces";
import { AppConfig, CustomLoggerService } from "./services";

// @Module({})
export class CommonModule {
  static registerAsync(options: CommonModuleAsyncOptions, isGlobal = true): DynamicModule {
    if (!options.useFactory) throw new Error('Missing Configurations for CommonModule: useFactory is required');

    // const providers = [
    //   ...createAsyncProviders(options),
    //   AppConfig,
    //   MongoDbHealthService,
    //   EventListenerErrorHandlerService,
    //   CustomLoggerService,
    //   LoggingInterceptor,
    //   VerifyS2SJwtToken,
    // ];

    // const imports = [
    //   ...(options.imports ?? []),
    //   TerminusModule,
    //   ConfigModule.forRoot({ isGlobal: true, validationSchema: configSchema(options.appConfig) }),
    //   JwtModule.registerAsync({
    //     imports: [...(options.imports ?? [])],
    //     useFactory: options.useFactory.jwt ?? (() => ({})),
    //     inject: options.inject.jwt ?? [],
    //   }),
    //   EventEmitterModule.forRoot(),
    //   MongooseModule.forRootAsync({
    //     imports: [...(options.imports ?? [])],
    //     inject: [...(options.inject.mongoose ?? [])],
    //     useFactory: async (...args) => {
    //       const mongooseOptions = await options.useFactory.mongoose(...args);

    //       return {
    //         ...mongooseOptions,
    //         readPreference: ReadPreferenceMode.primaryPreferred,
    //         readConcern: { level: ReadConcernLevel.majority },
    //         writeConcern: { w: 'majority' },
    //         connectionFactory: (connection: Connection) => {
    //           // connection.plugin(globalValidationPlugin);
    //           return connection;
    //         },
    //       };
    //     },
    //   }),
    // ];

    return {
      module: CommonModule,
    //   imports,
    //   providers: [
    //     ...providers,
    //     {
    //       provide: APP_FILTER,
    //       useClass: ExceptionFilter,
    //     },
    //     {
    //       provide: APP_GUARD,
    //       useClass: JwtDecodeGuard,
    //     },
    //     {
    //       provide: APP_GUARD,
    //       useClass: AdminPermissionGuard,
    //     },
    //     {
    //       provide: APP_GUARD,
    //       useClass: SupplierPermissionGuard,
    //     },
    //     {
    //       provide: APP_INTERCEPTOR,
    //       useClass: LoggingInterceptor,
    //     },
    //   ],
    //   exports: [...imports, ...providers],
    //   global: isGlobal,
    //   controllers: [HealthController],
    };
  }
}