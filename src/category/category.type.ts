import { IsBoolean, IsObject, IsUrl, ValidateNested } from 'class-validator';
import { Model } from 'mongoose';
import { BaseModel, IBaseInstanceMethods } from '../base';
import { LocalizedText } from 'src/common/localized-text/localized-text.type';

export class Category extends BaseModel<Category> {
  @IsObject()
  @ValidateNested()
  name: LocalizedText;

  @IsUrl()
  pictureUrl: string;

  @IsBoolean()
  isArchived: boolean;
}

export interface ICategoryInstanceMethods extends IBaseInstanceMethods {
  archiveDoc: () => Promise<void>;
  unArchiveDoc: () => Promise<void>;
}

export interface ICategoryModel extends Model<Category, Record<string, unknown>, ICategoryInstanceMethods> {}