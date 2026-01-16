import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { HttpStatusCode } from 'src/shared/enums/http-status.enum';
import { Tag } from '../tag/entities/tag.entity';
import { IBaseCreatedRes, IBaseDeleteRes, IBaseGetAllRes, IBaseGetOneRes } from 'src/shared/interfaces/common/IBaseRetun.interface';
import { Collection } from '../collection/entities/collection.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product> ,

    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,

    @InjectRepository(Collection)
    private readonly collectionRepo: Repository<Collection>,
  ){}

  async create(createProductDto: CreateProductDto): Promise<IBaseCreatedRes> {
   const exists = await this.productRepo.findOne({
    where: { name: createProductDto.name },
  });

  if (exists) throw new BadRequestException("Product name already exists");

    try{
      const { tagIds, variants, collectionId, ...productData } = createProductDto;

      const product = this.productRepo.create(productData);

          if (tagIds && tagIds.length > 0) {
        const tags = await this.tagRepo.find({ where: { id: In(tagIds) } });
        if (tags.length !== tagIds.length) {
          throw new BadRequestException("Some tags not found");
        }
        product.tags = tags;
      }

      // ✅ Variants
      if (variants && variants.length > 0) {
        product.variants = variants.map((v) => {
          const variant = {
            stock: v.stock,
            price: v.price,
            discount: v.discount,
            images: v.images, // ProductImage[]
            size: { id: v.sizeId }, // chỉ reference sizeId
          };
          return variant;
        }) as any; // typecasting nếu cần
      }

      if (collectionId) {
        const collection = await this.collectionRepo.findOne({
          where: { id: collectionId },
        });

        if (!collection) {
          throw new BadRequestException("Collection not found");
        }

        product.collection = collection;
      }

      const savedProduct = await this.productRepo.save(product); // cascade save variants + images

      return {
        data: savedProduct,
        message: "Product created successfully",
        statusCode: HttpStatusCode.CREATED,
      };
    }
    catch (error) {
      console.log("error creating product", error);
      throw new BadRequestException("Failed to create product")
    }
  }
  
  async findAll(): Promise<IBaseGetAllRes> {
    try {
      const data = await this.productRepo.find({
        relations: ["tags", "collection"],
        order: {createdAt: 'DESC'}
      })
      return {
        data: data,
        statusCode: HttpStatusCode.OK,
        totalItems: data.length
      }
    } catch (error) {
      console.log("error fetching", error);
      throw new BadRequestException("Fetching fail")
    }
  }

  async findMulti(): Promise<IBaseGetAllRes>{
    try {
      const data = await this.productRepo.find({
        where: {isActive: true},
        order: {createdAt: "DESC"},
        relations: ['tags']
      })

      return {
        data: data,
        statusCode: HttpStatusCode.OK,
        totalItems: data.length
      }
    } catch (error) {
      console.log("error fetching", error);
      throw new BadRequestException("Fetching fail")
    }
  }

  async findOne(slug: string): Promise<IBaseGetOneRes> {
    try {
      const product = await this.productRepo.findOne({
        where: {slug: slug},
        order: {createdAt: "DESC"},
        relations: ['tags']
      })
      if(!product){
        throw new NotFoundException("Product not found")
      }
      return{
        data: product,
        statusCode: HttpStatusCode.OK
      }
    } catch (error) {
      console.log("error find product", error);
      throw new NotFoundException("Product not found")
    } 
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto
  ): Promise<IBaseCreatedRes> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['tags', 'variants', 'collection'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    try {
      const { tagIds, variants, collectionId, ...productData } =
        updateProductDto;

      /* ======================
      *  Update base fields
      * ====================== */
      this.productRepo.merge(product, productData);

      /* ======================
      *  Update tags
      * ====================== */
      if (tagIds) {
        if (tagIds.length === 0) {
          product.tags = [];
        } else {
          const tags = await this.tagRepo.find({
            where: { id: In(tagIds) },
          });

          if (tags.length !== tagIds.length) {
            throw new BadRequestException('Some tags not found');
          }

          product.tags = tags;
        }
      }

      /* ======================
      *  Update variants
      * ====================== */
      if (variants) {
        product.variants = variants.map((v) => ({
          stock: v.stock,
          price: v.price,
          discount: v.discount,
          images: v.images,
          size: v.sizeId ? { id: v.sizeId } : null,
        })) as any;
      }

      /* ======================
      *  Update collection
      * ====================== */
      if (collectionId !== undefined) {
        if (!collectionId) {
          // product.collection = null;
        } else {
          const collection = await this.collectionRepo.findOne({
            where: { id: collectionId },
          });

          if (!collection) {
            throw new BadRequestException('Collection not found');
          }

          product.collection = collection;
        }
      }

      await this.productRepo.save(product);

      return {
        message: 'Product updated successfully',
        statusCode: HttpStatusCode.OK,
        data: product,
      };
    } catch (error) {
      console.log('error updating product', error);
      throw new BadRequestException('Update failed');
    }
  }


  async remove(id: string):Promise<IBaseDeleteRes> {
    try {
      const product = await this.productRepo.findOne({where: {id}})
      if(!product){
        throw new NotFoundException("Product not found")
      }
      await this.productRepo.remove(product);
      return{
        message: `${product.name} is deleted successfull`,
        statusCode: HttpStatusCode.OK
      }
    } catch (error: any) {
      console.log("error delete product", error.message);
      throw new BadRequestException("Remove product fail")
    }
  }
}
