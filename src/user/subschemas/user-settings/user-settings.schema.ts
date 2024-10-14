import { Schema } from 'mongoose';
import { UserSettingsSubSchemaType } from './user-settings.type';
import { UserSettingsLanguageEnum } from './user-settings.enum';

export const UserSettingsSubSchema = new Schema<UserSettingsSubSchemaType>(
  {
    language: {
      type: String,
      enum: UserSettingsLanguageEnum,
      default: UserSettingsLanguageEnum.EN,
    },
  },
  {
    _id: false,
    timestamps: false,
  },
);