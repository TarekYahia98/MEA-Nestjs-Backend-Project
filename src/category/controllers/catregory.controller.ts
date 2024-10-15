import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { CustomResponse } from "src/common/classes";
import { Persona, IsPrivateAuthOrPublic } from "src/common/decorators";
import { BasePaginationQuery } from "src/common/dtos";
import { UserJwtPersona } from "src/common/interfaces";
import { CategoryIdParamDto } from "src/shared/dto/category-id-param.dto";
import { CategoryService } from "../services/category.service";


@Controller({
  path: 'category',
})
@ApiTags('category-user')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get a paginated list of categories by the current logged-in user' })
  @ApiBearerAuth()
  async getCategories(@Persona() userJWT: UserJwtPersona, @Query() query: BasePaginationQuery) {
    const categories = await this.categoryService.getCategories(userJWT._id, query);
    return new CustomResponse().success({
      payload: categories,
    });
  }

  @Get('public')
  @IsPrivateAuthOrPublic()
  @ApiOperation({ summary: 'Get a paginated list of categories by guest user' })
  async getPublicCategories(@Query() query: BasePaginationQuery) {
    const categories = await this.categoryService.getCategories(undefined, query);
    return new CustomResponse().success({
      payload: categories,
    });
  }

  @Get(':categoryId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get details of a category by the current logged-in user'})
  async getCategoryById(@Persona() userJWT: UserJwtPersona, @Param() param: CategoryIdParamDto) {
    const category = await this.categoryService.getCategoryById(userJWT._id, param);
    return new CustomResponse().success({
      payload: {
        data: category,
      },
    });
  }

  @Get('public/:categoryId')
  @IsPrivateAuthOrPublic()
  @ApiOperation({ summary: 'Get details of a category by guest user'})
  async getPublicCategoryById(@Param() param: CategoryIdParamDto) {
    const category = await this.categoryService.getCategoryById(undefined, param);
    return new CustomResponse().success({
      payload: {
        data: category,
      },
    });
  }
}