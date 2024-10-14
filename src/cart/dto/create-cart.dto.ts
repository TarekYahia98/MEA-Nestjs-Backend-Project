import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum,
  IsInstance,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';
import { TransformObjectId } from 'src/common/decorators/class-transformer/transform-mongo-id.decorator';

export class QuantityDto {
  @ApiProperty({
    type: Number,
    description: 'The number of items',
    example: 5,
  })
  @IsNumber()
  @IsOptional()
  items: number;

  @ApiProperty({
    type: Number,
    description: 'The number of units',
    example: 10,
  })
  @IsNumber()
  @IsOptional()
  units: number;
}

export class CreateCartDto {
  @ApiProperty({
    type: String,
    description: 'The ID of the item',
    example: '60b6c0f1a19a4a4a4c4a4a4b',
  })
  @IsNotEmpty()
  @IsInstance(Types.ObjectId)
  @TransformObjectId()
  item: Types.ObjectId;

  @ApiProperty({
    type: QuantityDto,
    description: 'The quantity of the item',
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => QuantityDto)
  quantity: QuantityDto;
}