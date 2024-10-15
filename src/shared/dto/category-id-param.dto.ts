import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsString } from "class-validator";

export class CategoryIdParamDto {
    @ApiProperty({ description: 'ID of the order' })
    @IsString()
    @IsMongoId()
    categoryId: string;
  }