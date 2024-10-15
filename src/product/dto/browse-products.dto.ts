import { IsMongoId } from "class-validator";
import { BasePaginationQuery } from "src/common/dtos";

export class BrowseProductsDto extends BasePaginationQuery {
  @IsMongoId()
  categoryId: string; 
}