import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class CartSizeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "M" })
  label: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "m" })
  value: string;
}

export class CreateCartDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'e9fc7fde-dba0-4f19-a779-37ebaa595ff2',
        description: 'Product id',
    })
    productId: string;

    // @IsString()
    // @IsNotEmpty()
    // @ApiProperty({
    //     example: '719ce039-7fe4-4fa2-8a1b-fcd78a306c6d',
    //     description: 'User id',
    // })
    // userId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Silk Drum Lamp Shade',
        description: 'Product name',
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'silk-drum-lamp-shade',
        description: 'Product slug',
    })
    slug: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: '3500',
        description: 'Product price',
    })
    price: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: '10',
        description: 'Product Quantity',
    })
    quantity: number;

    @IsOptional()
    @ApiProperty({
        example: '3500',
        description: 'Product discount',
    })
    discount: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '/products/557a49f7-d21f-44f0-9fee-4a8d9f613ea9.jpg',
        description: 'Product thumbnail',
    })
    thumbnail: string;

    @ValidateNested()
    @Type(() => CartSizeDto)
    @ApiProperty({
    type: CartSizeDto,
    description: "Selected size",
    })
    size: CartSizeDto;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CartSizeDto)
    @ApiProperty({
        type: CartSizeDto,
        isArray: true,
        description: "Available sizes",
    })
    sizes: CartSizeDto[];

}