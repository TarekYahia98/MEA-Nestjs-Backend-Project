import { FactoryProvider, Module } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getConnectionToken } from '@nestjs/mongoose';
import { UserEventListener, UserHelperService, userSchemaFactory } from '@schemas';
import { ModelNames } from 'src/common/constants';

const UserMongooseDynamicModule: FactoryProvider = {
  provide: ModelNames.USER,
  inject: [getConnectionToken(), EventEmitter2],
  useFactory: userSchemaFactory,
};

const userProviders = [UserMongooseDynamicModule, UserHelperService, UserEventListener];

@Module({
  imports: [MongooseCommonModule.forRoot()],
  providers: userProviders,
  exports: userProviders,
})
export class UserMongooseModule {}