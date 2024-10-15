import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProductService } from "../services/product.service";

@Controller('product')
  @ApiTags('product-user')
  export class ProductController {
    constructor(private readonly productService: ProductService) {}
}