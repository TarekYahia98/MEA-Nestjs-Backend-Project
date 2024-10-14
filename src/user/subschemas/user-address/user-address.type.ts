import { IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { PointLocation } from 'src/point/point.type';

export class UserAddress {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  @ValidateNested()
  location: PointLocation;
}