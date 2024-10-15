import { Inject, Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { ModelNames } from "src/common/constants";
import { IBaseProductModel } from "../schemas";
import { IOrderModel } from "src/order/schemas/order.type";

@Injectable()
export class ProductService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @Inject(ModelNames.BASE_PRODUCT) private baseProductModel: IBaseProductModel,
    @Inject(ModelNames.ORDER) private baseOrderModel: IOrderModel,

  ){}

  async getSearchedProducts(){}

  async getNewArrivalProducts(){}

  async getBestSellingProducts(){}

  async browseProducts(){}

  async getProductById(){}

}