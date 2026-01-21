import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetProductQueryDto } from './dto/get-product-query.dto';

@Controller('product')
@ApiBearerAuth('access_token')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post("/create")
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("find-all")
  findAll() {
    return this.productService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Get("find-multi")
  findMulti(@Query() query: GetProductQueryDto) {
    return this.productService.findMulti(query);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('find-one-by-slug/:slug')
  findOne(@Param('slug') slug: string) {
    return this.productService.findOne(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
