import {
    Body,
    Controller,
    Post,
  } from '@nestjs/common';
  import {
    ApiBearerAuth,
    ApiOperation,
    ApiTags,
  } from '@nestjs/swagger';
import { CustomResponse } from 'src/common/classes';
import { Persona } from 'src/common/decorators';
import { UserJwtPersona } from 'src/common/interfaces';
import { UserCartService } from '../services/user-cart.service';
import { CreateCartDto } from '../dto/create-cart.dto';
  
  @Controller('cart')
  @ApiTags('user-cart')
  export class UserCartController {
    constructor(private readonly userCartService: UserCartService) {}
  
    @Post('add-to-cart')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Add item to cart' })
    async addToCart(
      @Persona() userJWT: UserJwtPersona,
      @Body() createCartDto: CreateCartDto,
    ) {
      const newCartItem = await this.userCartService.addToCart(
        userJWT._id,
        createCartDto,
      );
  
      return new CustomResponse().success({
        payload: { data: newCartItem },
        statusCode: 201,
      });
    }
  }