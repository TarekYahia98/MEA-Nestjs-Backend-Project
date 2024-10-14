import { EventEmitter2 } from '@nestjs/event-emitter';
import * as bcrypt from 'bcrypt';
import { Connection, HydratedDocument, Schema } from 'mongoose';
import { User, IUserInstanceMethods, IUserModel } from './user.type';
import { ModelNames } from 'src/common/constants';
import { UserAddressSchema, UserSettingsSubSchema, UserSettingsLanguageEnum } from '../subschemas';
import { UserEventsEnum } from './user.enum';
import { BaseSchema } from 'src/base/base.schema';
import { validateSchema } from 'src/common/helpers/mongoose-schema-validation.helper';

export const UserSchema = new Schema<User, IUserModel, IUserInstanceMethods>(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      trim: true,
      lowercase: true,
      required: true,
    },

    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    address: {
      type: UserAddressSchema,
    },

    settings: {
      type: UserSettingsSubSchema,
      required: false,
      default: {
        language: UserSettingsLanguageEnum.EN,
      },
    },

    ...BaseSchema,
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  },
);

export function userSchemaFactory(connection: Connection, eventEmitter: EventEmitter2) {
  UserSchema.index({ email: 1 }, { unique: true });
  UserSchema.index({ deletedAt: 1 });

  UserSchema.pre('validate', async function () {
    // Without this condition, schema validation will fail at the "name" path
    if (!this.isModified('deletedAt') && this.deletedAt !== null) {
      await validateSchema(this, User);
    }
  });

  UserSchema.pre('save', async function () {
    if (!this.isModified('password')) {
      return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

  UserSchema.methods.comparePassword = async function (this: HydratedDocument<User>, password: string) {
    return bcrypt.compare(password, this.password);
  };

  UserSchema.methods.deleteDoc = async function (this: HydratedDocument<User>) {
    this.name = this.name + '_deleted_' + new Date();
    this.email = this.email + '_deleted_' + new Date();
    this.deletedAt = new Date();
    await this.save();

    eventEmitter.emit(UserEventsEnum.DELETE_DOC, this);
  };

  const userModel = connection.model(ModelNames.USER, UserSchema);

  return userModel;
}