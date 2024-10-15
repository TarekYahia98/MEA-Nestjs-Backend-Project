import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsString } from "class-validator";

export class ProductIdParamDto {
    @ApiProperty({ description: 'ID of the product' })
    @IsString()
    @IsMongoId()
    productId: string;
  }