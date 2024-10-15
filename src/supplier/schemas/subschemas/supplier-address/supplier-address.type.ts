import { IsObject, ValidateNested, IsOptional, IsString, IsNotEmpty, IsDefined } from "class-validator";
import { PointLocation } from "src/point";

export class SupplierAddress {
  @IsObject()
  @ValidateNested()
  @IsOptional()
  location?: PointLocation;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  description: string;
}