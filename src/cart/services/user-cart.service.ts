import { Injectable, Inject, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection, Types } from "mongoose";
import { ModelNames } from "src/common/constants";
import { IUserModel } from "src/user/schemas";
import { CreateCartDto } from "../dto/create-cart.dto";
import { ICartModel, Cart } from "../schemas/cart.type";

@Injectable()
export class UserCartService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    // @Inject(ModelNames.ORDER) private orderModel: IOrderModel,
    @Inject(ModelNames.CART) private cartModel: ICartModel,
    @Inject(ModelNames.USER) private userModel: IUserModel,
    // @Inject(ModelNames.PRODUCT) private productModel: IProductModel,
    // private readonly sesService: AwsSESService,
  ) {}

  async validateQuantity(quantity: number) {
    return quantity > 0;
  }

  
  async addToCart(userId: string, createCartDto: CreateCartDto) {
    const { item, quantity } = createCartDto;
  }
}