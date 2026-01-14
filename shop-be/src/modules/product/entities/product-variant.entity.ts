// src/modules/product/entities/product-variant.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Product } from './product.entity';
import { ProductOption } from './product-options.entity';

@Entity('product_variants')
export class ProductVariant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProductOption, { eager: true })
  size: ProductOption;

  @Column('int')
  stock: number;

  @Column('int')
  price: number;

  @Column('int', {nullable: true })
  discount?: number;

  // @OneToMany(() => ProductImage, (image) => image.variant, { cascade: true, eager: true })
  // images: ProductImage[];

  @Column({ type: 'simple-array', nullable: true })
  images: string[]

  @ManyToOne(() => Product, (product) => product.variants, { onDelete: 'CASCADE' })
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
