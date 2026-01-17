import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import {CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';

@Controller('cart')
@ApiBearerAuth('access_token')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post("create")
  create(@Body() createCartDto: CreateCartDto,  @CurrentUser() user: User,) {
    return this.cartService.addOrUpdateCart(createCartDto, user.id);
  }

  @Get("find-all")
  findAll() {
    return this.cartService.findAll();
  }

  @Get("find-one-by-id")
  findOneById(@CurrentUser() user: User) {
    return this.cartService.findOneById(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(id, updateCartDto);
  }

  // @Delete(':id')
  // remove(
  //   @Param('id') id: string,
  //   @Query('size') sizeValue: string,
  //   @CurrentUser() user: any
  // ) {
  //   return this.cartService.remove(id, sizeValue, user.id);
  // }

  @Delete('delete/:id')
  remove(
    @Param('id') id: string,
  ) {
    return this.cartService.remove(id);
  }
}
