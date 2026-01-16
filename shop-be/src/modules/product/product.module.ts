import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Tag } from '../tag/entities/tag.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { ProductOption } from './entities/product-options.entity';
import { Collection } from '../collection/entities/collection.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Tag, ProductVariant, ProductOption, Collection])
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
