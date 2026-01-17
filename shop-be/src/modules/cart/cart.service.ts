import { BadRequestException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CartSizeDto, CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { IBaseCreatedRes, IBaseDeleteRes, IBaseGetAllRes, IBaseUpdatedRes } from 'src/shared/interfaces/common/IBaseRetun.interface';
import { HttpStatusCode } from 'src/shared/enums/http-status.enum';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Cart)
    private readonly cartRepo: Repository<Cart>
  ){}

  async addOrUpdateCart(dto: CreateCartDto, userId: string) {
    const { productId, quantity, size, variantId } = dto;

    const existingCart = await this.cartRepo
      .createQueryBuilder('cart')
      .where('cart.userId = :userId', { userId })
      .andWhere('cart.productId = :productId', { productId })
      .andWhere('cart.variantId = :variantId', { variantId })
      .andWhere(
      "CAST(JSON_UNQUOTE(JSON_EXTRACT(cart.size, '$.value')) AS CHAR) = :sizeValue",
      { sizeValue: size.value }
    )
    .getOne();

    if (existingCart) {
      const newQuantity = existingCart.quantity + quantity;

      if (newQuantity <= 0) {
        await this.cartRepo.remove(existingCart);
        return {
          message: 'Cart item removed',
          statusCode: HttpStatusCode.OK,
        };
      }

      existingCart.quantity = newQuantity;
      const saved = await this.cartRepo.save(existingCart);

      return {
        data: saved,
        message: 'Cart updated',
        statusCode: HttpStatusCode.OK,
      };
    }

    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
    }

    const newCart = this.cartRepo.create({
      ...dto,
      userId,
    });

    const saved = await this.cartRepo.save(newCart);

    return {
      data: saved,
      message: 'Added to cart',
      statusCode: HttpStatusCode.CREATED,
    };
  }

  async create(createCartDto: CreateCartDto): Promise<IBaseCreatedRes> {
    try {
      const newCart = this.cartRepo.create(createCartDto);
      return{
        data: await this.cartRepo.save(newCart),
        message: `${newCart.name} added to cart`,
        statusCode: HttpStatusCode.CREATED
      }
    } catch (error: any) {
      console.log("error is create cart", error.message);
      throw new BadRequestException("Failed to add cart")
    }
  }

  async update(id: string, updateCartDto: UpdateCartDto): Promise<IBaseUpdatedRes> {
    try {
      const cart = await this.cartRepo.findOne({where: {id}});
      if(!cart){
        throw new NotFoundException("Collection not found")
      }

      const newData = this.cartRepo.merge(cart, updateCartDto);
      await this.cartRepo.save(newData);

       return{
        message: 'Update successful',
        statusCode: HttpStatusCode.OK
      }
    } catch (error: any) {
      console.log("error updating cart", error.message);
      throw new BadRequestException("Update fail")
    }
  }

  async findAll(): Promise<IBaseGetAllRes> {
    try {
      const data = await this.cartRepo.find({
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

  async findOneById(userId: string): Promise<IBaseGetAllRes>{
    if (!userId) {
      throw new NotFoundException("You don't have any products in your shopping cart.");
    }
    try {
      const data = await this.cartRepo.find({order: {createdAt: 'DESC'}, where: {userId}})

      return{
        data: data,
        statusCode: HttpStatusCode.OK,
        totalItems: data.length
      }
    } catch (error: any) {
      console.log("error fetching", error.message);
      throw new BadRequestException("Fetching fail")
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  async remove(id: string):Promise<IBaseDeleteRes> {
    try {
      const cart = await this.cartRepo.findOne({where: {id}})
      if(!cart){
        throw new NotFoundException("Product not found")
      }
      await this.cartRepo.remove(cart);
      return{
        message: `${cart.name} is deleted successfull`,
        statusCode: HttpStatusCode.OK
      }
    } catch (error: any) {
      console.log("error delete product", error.message);
      throw new BadRequestException("Remove product fail")
    }
  }

  // async remove(
  //   id: string,
  //   sizeValue: string,
  //   userId: string
  // ): Promise<IBaseDeleteRes> {
  //   const cart = await this.cartRepo
  //     .createQueryBuilder('cart')
  //     .where('cart.id = :id', { id })
  //     .andWhere('cart.userId = :userId', { userId })
  //     .andWhere(
  //       "JSON_UNQUOTE(JSON_EXTRACT(cart.size, '$.value')) = :sizeValue",
  //       { sizeValue }
  //     )
  //     .getOne();

  //   if (!cart) {
  //     throw new NotFoundException("Product not found");
  //   }

  //   await this.cartRepo.remove(cart);

  //   return {
  //     message: `${cart.name} is deleted from cart successfully`,
  //     statusCode: HttpStatusCode.OK,
  //   };
  // }

}
