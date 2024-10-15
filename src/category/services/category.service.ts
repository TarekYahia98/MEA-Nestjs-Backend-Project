import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { Types } from "mongoose";
import { ResponsePayload } from "src/common/classes";
import { ModelNames } from "src/common/constants";
import { BasePaginationQuery } from "src/common/dtos";
import { ICategoryModel, Category } from "../schemas";
import { CategoryIdParamDto } from "src/shared/dto/category-id-param.dto";


@Injectable()
export class CategoryService {
  constructor(@Inject(ModelNames.CATEGORY) private readonly categoryModel: ICategoryModel) {}

  async getCategories(userId: string, query: BasePaginationQuery): Promise<ResponsePayload<Category>> {
    const { page, limit } = query;

    const matchStage = [
      {
        $match: {
          isArchived: false,
        },
      },
    ];

    const [[{ total = 0 } = {}], docs] = await Promise.all([
      this.categoryModel.aggregate(matchStage).count('total'),
      this.categoryModel.aggregate([
        ...matchStage,
        // ...addPaginationStages({ page, limit }),
        // ...getCategoriesPipeline(),
      ]),
    ]);

    return { data: docs, total, limit, page, pages: Math.ceil(total / limit) };
  }

  async getCategoryById(userId: string, { categoryId }: CategoryIdParamDto) {
    const category = await this.categoryModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(categoryId),
          isArchived: false,
        },
      },
    //   ...getCategoriesPipeline(),
    ]);
    return category;
  }
}