import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
  } from '@nestjs/common';
  import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
  import {
    OrderIdParamDto,
  } from '@shared/dto/order-id-param.dto';
import { CustomResponse } from 'src/common/classes';
import { Persona } from 'src/common/decorators';
import { UserJwtPersona } from 'src/common/interfaces';

  
  @Controller('order')
  @ApiTags('user-order')
  export class UserOrderController {
    constructor(private readonly userOrderService: UserOrderService) {}
  
    @Post('place-order')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Place an order by the current logged-in user' })
    async placeOrder(@Persona() userJWT: UserJwtPersona) {
      const newOrder = await this.userOrderService.placeOrder(userJWT._id);
  
      return new CustomResponse().success({
        payload: { data: newOrder },
        statusCode: 201,
      });
    }
  
    @Post('checkout')
    @ApiBearerAuth()
    @ApiOperation({
      summary:
        'Fetch cart items and calculate totals for the current logged-in user',
    })
    async checkout(@Persona() userJWT: UserJwtPersona) {
      const checkoutData = await this.userOrderService.checkout(userJWT._id);
  
      return new CustomResponse().success({
        payload: { data: checkoutData },
        statusCode: 200,
      });
    }
  
    @Get()
    @ApiBearerAuth()
    @ApiOperation({
      summary:
        'Get a paginated list of orders offered by the current logged-in user',
    })
    async getAllOrders(
      @Persona() userJWT: UserJwtPersona,
      @Query() query: BasePaginationQuery,
    ) {
      const result = await this.userOrderService.getAllOrders(userJWT._id, query);
  
      return new CustomResponse().success({
        payload: { data: result },
      });
    }
  
    @Get(':orderId')
    @ApiBearerAuth()
    @ApiOperation({
      summary: 'Get details of an order created by the current logged-in user',
    })
    async getOrderDetailsById(
      @Persona() userJWT: UserJwtPersona,
      @Param() param: OrderIdParamDto,
    ) {
      const result = await this.userOrderService.getOrderDetailsById(
        userJWT._id,
        param,
      );
  
      return new CustomResponse().success({
        payload: { data: result },
      });
    }
  
    @Post('cancel/:orderId')
    @ApiBearerAuth()
    @ApiOperation({
      summary: 'Cancel a specific order by the current logged-in user',
    })
    @ApiResponse({
      status: 200,
      description: 'Order successfully canceled',
      type: CustomResponse,
    })
    @ApiResponse({
      status: 400,
      description: 'Bad request, e.g., invalid order or reason missing',
    })
    async cancelOrder(
      @Persona() userJWT: UserJwtPersona,
      @Param() param: OrderIdParamDto,
      @Body() body: CancelOrderDto,
    ) {
      const result = await this.userOrderService.cancelOrder(
        userJWT._id,
        param,
        body,
      );
  
      return new CustomResponse().success({
        payload: { data: result },
      });
    }
  
    @Post('cancel-item/:orderId/item/:itemId')
    @ApiBearerAuth()
    @ApiOperation({
      summary: 'Cancel a specific item in an order by the current logged-in user',
    })
    @ApiResponse({
      status: 200,
      description: 'Item successfully canceled',
      type: CustomResponse,
    })
    @ApiResponse({
      status: 400,
      description: 'Bad request, e.g., invalid order or reason missing',
    })
    async cancelOrderItem(
      @Persona() userJWT: UserJwtPersona,
      @Param('orderId') orderId: string, // Extract orderId from route parameters
      @Param('itemId') itemId: string, // Extract itemId from route parameters
      @Body() body: CancelOrderItemDto,
    ) {
      const result = await this.userOrderService.cancelOrderItem(
        userJWT._id,
        { orderId }, // Pass orderId as an object
        { itemId }, // Pass itemId as an object
        body,
      );
  
      return new CustomResponse().success({
        payload: { data: result },
      });
    }
  }