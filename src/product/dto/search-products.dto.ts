import { IsOptional, IsString } from "class-validator";
import { BasePaginationQuery } from "src/common/dtos";

export class SearchProductsDto extends BasePaginationQuery {
  @IsOptional()
  @IsString()
  search?: string;
}