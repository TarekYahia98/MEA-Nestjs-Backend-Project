import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    ArrayMinSize,
    ArrayNotEmpty,
    IsArray,
    IsBoolean,
    IsEnum,
    IsInstance,
    IsInt,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    Max,
    Min,
    ValidateNested,
  } from 'class-validator';
  import { Model, Types } from 'mongoose';
import { BaseModel, IBaseInstanceMethods } from 'src/base';
import { TransformObjectId, TransformObjectIds } from 'src/common/decorators';
import { OrderPaymentMethod, OrderStatusEnum, PaymentStatus } from './order.enum';
import { OrderProduct } from './subschemas/order-product/order-product.type';
import { ExtendedUser } from './subschemas/extended-user/extended-user.type';

  
  export class Order extends BaseModel<Order> {
    @IsString()
    generatedCode: string;
  
    @ValidateNested()
    @Type(() => ExtendedUser)
    user: ExtendedUser;
  
    @ApiPropertyOptional()
    @IsInt()
    @Min(1)
    @Max(5)
    @IsOptional()
    rating?: number;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderProduct)
    orderedProducts: OrderProduct[];
  
    @IsArray()
    @IsInstance(Types.ObjectId, { each: true })
    @TransformObjectIds()
    categories: Types.ObjectId[];
  
    @IsNumber()
    @IsOptional()
    amountSubTotal?: number;
  
    @IsNumber()
    @IsOptional()
    amountTotal?: number;
  
    @IsNumber()
    @IsOptional()
    amountDiscount?: number;
  
    @IsInt()
    // @Min(1)
    // @Max(99)
    @IsOptional()
    discountPercentage?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    shippingFees?: number;
  
    @IsOptional()
    @IsEnum(OrderStatusEnum)
    status?: OrderStatusEnum;
  
    @IsOptional()
    @IsBoolean()
    isArchived?: boolean;

    @IsString()
    @IsEnum(OrderPaymentMethod)
    paymentMethod: OrderPaymentMethod;

    @IsString()
    @IsEnum(PaymentStatus)
    paymentStatus: PaymentStatus;
  }
  
  export interface IOrderInstanceMethods extends IBaseInstanceMethods {
    archiveDoc: () => Promise<void>;
    unArchiveDoc: () => Promise<void>;
  }
  
  export interface IOrderModel extends Model<Order, Record<string, unknown>, IOrderInstanceMethods> {}