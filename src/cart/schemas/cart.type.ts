import { Model, Types } from 'mongoose';
import {
  IsInstance,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { BaseModel, IBaseInstanceMethods } from 'src/base';
import { TransformObjectId } from 'src/common/decorators';

export class QuantityDto {
  @ApiProperty({
    type: Number,
    description: 'The number of items',
    example: 5,
  })
  @IsNumber()
  @IsOptional()
  items?: number;
  @ApiProperty({
    type: Number,
    description: 'The number of units',
    example: 10,
  })
  @IsNumber()
  @IsOptional()
  units?: number;
}
export class Cart extends BaseModel<Cart> {
  @IsInstance(Types.ObjectId)
  @TransformObjectId()
  supplier: Types.ObjectId;

  @IsNotEmpty()
  @IsInstance(Types.ObjectId)
  @TransformObjectId()
  user: Types.ObjectId;

  @IsInstance(Types.ObjectId)
  @TransformObjectId()
  @ApiProperty({ type: String })
  item: Types.ObjectId;

  @IsInstance(Types.ObjectId)
  @TransformObjectId()
  @ApiProperty({ type: String })
  @IsOptional()
  product: Types.ObjectId;

  @ApiProperty({
    type: QuantityDto,
    description: 'The quantity of the item',
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => QuantityDto)
  quantity: QuantityDto;
}
export interface ICartInstanceMethods extends IBaseInstanceMethods {}
export interface ICartModel extends Model<Cart, Record<string, unknown>, ICartInstanceMethods> {}