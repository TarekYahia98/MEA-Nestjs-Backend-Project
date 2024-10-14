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
import { Types } from 'mongoose';
import { DiscountTypeEnum } from './extended-product.enum';
import { TransformObjectId } from 'src/common/decorators';
import { LocalizedText } from 'src/common/localized-text';
import { ProductType } from 'src/product/schemas/product.enum';

export class ExtendedProduct {
  @IsInstance(Types.ObjectId)
  @TransformObjectId()
  id: Types.ObjectId;

  @IsArray()
  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  images: string[];

  @IsNumber()
  quantityInStock: number;

  @IsObject()
  @ValidateNested()
  title: LocalizedText;

  @IsNumber()
  price: number;

  @IsString()
  currency: string;

  @IsString()
  @IsEnum(ProductType)
  productType: ProductType;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsString()
  weightUnit?: string;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsString()
  @IsEnum(DiscountTypeEnum)
  discountType?: DiscountTypeEnum;

  @IsOptional()
  @IsNumber()
  priceAfterDiscount?: number;

  @IsBoolean()
  isInOffer: boolean;

  @IsOptional()
  @IsInstance(Types.ObjectId)
  @TransformObjectId()
  category?: Types.ObjectId;
}