import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { HttpStatusCode } from 'src/shared/enums/http-status.enum';
import { Tag } from '../tag/entities/tag.entity';
import { IBaseCreatedRes, IBaseGetAllRes, IBaseGetOneRes } from 'src/shared/interfaces/common/IBaseRetun.interface';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product> ,

    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
  ){}

  async create(createProductDto: CreateProductDto): Promise<IBaseCreatedRes> {
   const exists = await this.productRepo.findOne({
    where: { name: createProductDto.name },
  });

  if (exists) throw new BadRequestException("Product name already exists");

  
    try{
      const { tagIds, variants, ...productData } = createProductDto;

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
        relations: ["tags"],
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

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
