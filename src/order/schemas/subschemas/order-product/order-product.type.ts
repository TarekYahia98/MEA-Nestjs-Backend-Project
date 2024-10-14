import { IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ExtendedProduct } from '../extended-product';

export class OrderProduct {
  @ValidateNested()
  @Type(() => ExtendedProduct)
  product: ExtendedProduct;

  @IsNumber()
  quantity: number;
}