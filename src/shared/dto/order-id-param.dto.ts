import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class OrderIdParamDto {
  @ApiProperty({ description: 'ID of the order' })
  @IsString()
  @IsMongoId()
  orderId: string;
}

export class ItemIdParamDto {
  @ApiProperty({ description: 'ID of the item' })
  @IsString()
  @IsMongoId()
  itemId: string;
}