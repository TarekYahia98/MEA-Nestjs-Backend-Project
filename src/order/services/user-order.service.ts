import { Injectable, Inject } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, HydratedDocument, Types } from 'mongoose';
import { ModelNames } from 'src/common/constants';
import { IUserModel } from 'src/user/schemas';
  
  @Injectable()
  export class UserOrderService {
    constructor(
      @InjectConnection() private readonly connection: Connection,
      @Inject(ModelNames.ORDER) private orderModel: IOrderModel,
      @Inject(ModelNames.CART) private cartModel: ICartModel,
      @Inject(ModelNames.USER) private userModel: IUserModel,
      @Inject(ModelNames.PRODUCT) private productModel: IProductModel,
    ) {}




}