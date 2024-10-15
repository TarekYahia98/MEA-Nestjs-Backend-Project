import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ProductService } from "../services/product.service";
import { CustomResponse } from "src/common/classes";
import { Persona, IsPrivateAuthOrPublic } from "src/common/decorators";
import { BasePaginationQuery } from "src/common/dtos";
import { UserJwtPersona } from "src/common/interfaces";
import { ProductIdParamDto } from "src/shared/dto";
import { SearchProductsDto, BrowseProductsDto } from "../dto";

@Controller('product')
  @ApiTags('product-user')
  export class ProductController {
    constructor(private readonly productService: ProductService) {}

  @Get('search')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a searched list of products by the current logged-in user' })
  async getSearchedProducts(@Persona() userJWT: UserJwtPersona, @Query() query: SearchProductsDto) {
    // const products = await this.productService.getSearchedProducts(userJWT._id, query);

    return new CustomResponse().success({
      // payload: products,
    });
  }

  @Get('public/search')
  @IsPrivateAuthOrPublic()
  @ApiOperation({ summary: 'Get a searched list of products by the guest user' })
  async getGuestSearchedProducts(@Query() query: SearchProductsDto) {
    // const products = await this.productService.getSearchedProducts(query);

    return new CustomResponse().success({
      // payload: products,
    });
  }

  @Get('new-arrival')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a new list of arrival products by the current logged-in user' })
  async getNewArrivalProducts(@Persona() userJWT: UserJwtPersona, @Query() query: BasePaginationQuery) {
    // const products = await this.productService.getNewArrivalProducts(userJWT._id, query);

    return new CustomResponse().success({
      // payload: products,
    });
  }

  @Get('public/new-arrival')
  @IsPrivateAuthOrPublic()
  @ApiOperation({ summary: 'Get a new list of arrival products by the guest user' })
  async getGuestNewArrivalProducts(@Query() query: BasePaginationQuery) {
    // const products = await this.productService.getNewArrivalProducts(query);

    return new CustomResponse().success({
      // payload: products,
    });
  }

  @Get('best-selling')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a list of best selling products by the current logged-in user' })
  async getBestSellingProducts(@Persona() userJWT: UserJwtPersona, @Query() query: BasePaginationQuery) {
    // const products = await this.productService.getBestSellingProducts(userJWT._id, query);

    return new CustomResponse().success({
      // payload: products,
    });
  }

  @Get('public/best-selling')
  @IsPrivateAuthOrPublic()
  @ApiOperation({ summary: 'Get a list of best selling products by the guest user' })
  async getGuestBestSellingProducts(@Query() query: BasePaginationQuery) {
    // const products = await this.productService.getBestSellingProducts(query);

    return new CustomResponse().success({
      // payload: products,
    });
  }

  @Get('browse')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Browse products by the current logged-in user' })
  async browseProducts(@Persona() userJWT: UserJwtPersona, @Query() query: BrowseProductsDto) {
    // const products = await this.productService.browseProducts(userJWT._id, query);

    return new CustomResponse().success({
      // payload: products,
    });
  }

  @Get('public/browse')
  @IsPrivateAuthOrPublic()
  @ApiOperation({ summary: 'Browse products by the guest user' })
  async guestBrowseProducts(@Query() query: BrowseProductsDto) {
    // const products = await this.productService.browseProducts(query);

    return new CustomResponse().success({
      // payload: products,
    });
  }


  @Get(':productId/details')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get details of a product by the current logged-in user'})
  async getProductById(@Persona() userJWT: UserJwtPersona, @Param() param: ProductIdParamDto) {
    // const product = await this.productService.getProductById(userJWT._id, param);

    return new CustomResponse().success({
      // payload: { data: product },
    });
  }

  @Get('public/:productId/details')
  @IsPrivateAuthOrPublic()
  @ApiOperation({ summary: 'Get details of a product by the guest user'})
  async getGuestProductById(@Param() param: ProductIdParamDto) {
    // const product = await this.productService.getProductById(param);

    return new CustomResponse().success({
      // payload: { data: product },
    });
  }
}