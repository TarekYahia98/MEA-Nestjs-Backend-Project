import {
    ArrayNotEmpty,
    IsArray,
    IsBoolean,
    IsEnum,
    IsInstance,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    IsUrl,
    ValidateNested,
  } from 'class-validator';
  import { HydratedDocument, Model, PipelineStage, Types } from 'mongoose';
import { BaseModel, IBaseInstanceMethods } from 'src/base';
import { LocalizedText } from 'src/common/localized-text';
import { ProductType } from './product.enum';
import { SupportedCurrenciesEnum } from 'src/common/constants';
import { TransformObjectId } from 'src/common/decorators';

  
  export class BaseProduct extends BaseModel<BaseProduct> {
    @IsString()
    generatedSku: string;
  
    @IsArray()
    @ArrayNotEmpty()
    @IsUrl({}, { each: true })
    images: string[];
  
    @IsUrl()
    @IsOptional()
    video?: string;
  
    @IsNumber()
    quantityInStock: number;
  
    @IsObject()
    @ValidateNested()
    description: LocalizedText;
  
    @IsObject()
    @ValidateNested()
    title: LocalizedText;
  
    @IsNumber()
    price: number;
  
    @IsString()
    @IsEnum(SupportedCurrenciesEnum)
    currency: SupportedCurrenciesEnum;

    @IsInstance(Types.ObjectId)
    @TransformObjectId()
    category: Types.ObjectId;
  
    @IsBoolean()
    isArchivedByCategory: boolean;
  
    @IsBoolean()
    isArchivedByAdmin: boolean;
  
    @IsBoolean()
    isArchived: boolean;
  
    @IsString()
    @IsEnum(ProductType)
    productType: ProductType;
  }
  export interface IBaseProductInstanceMethods extends IBaseInstanceMethods {
    archiveDoc: () => Promise<void>;
    unArchiveDoc: () => Promise<void>;
    _archiveDocDueToCategoryArchival: () => Promise<void>;
    _unArchiveDocDueToCategoryUnArchival: () => Promise<void>;
  }
  
  export interface IBaseProductModel extends Model<BaseProduct, Record<string, unknown>, IBaseProductInstanceMethods> {
    populateBaseProductsWithPrePipeline: (
      this: IBaseProductModel,
      userId: string,
      prePipeline: PipelineStage[],
      isListView: boolean,
    ) => Promise<Array<HydratedDocument<BaseProduct>>>;
  
    getItemProductsPopulated: (
      this: IBaseProductModel,
      userId?: string,
      itemProductsIds?: string[] | Types.ObjectId[],
    ) => Promise<Array<HydratedDocument<BaseProduct>>>;
  }