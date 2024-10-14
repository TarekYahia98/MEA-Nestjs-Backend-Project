import { Injectable, Inject } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection} from 'mongoose';
import { ICartModel } from 'src/cart/schemas';
import { ModelNames } from 'src/common/constants';
import { IUserModel } from 'src/user/schemas';
import { IOrderModel } from '../schemas/order.type';
import { IBaseProductModel } from 'src/product/schemas/product.type';
  
  @Injectable()
  export class UserOrderService {
    constructor(
      @InjectConnection() private readonly connection: Connection,
      @Inject(ModelNames.ORDER) private orderModel: IOrderModel,
      @Inject(ModelNames.CART) private cartModel: ICartModel,
      @Inject(ModelNames.USER) private userModel: IUserModel,
      @Inject(ModelNames.BASE_PRODUCT) private baseProductModel: IBaseProductModel,
    ) {}

async placeOrder(){}

async checkout(){}

async getOrderDetailsById(){}

async cancelOrder(){}

async cancelOrderItem(){}

}