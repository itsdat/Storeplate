import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Scandinavian Coffee Table',
        description: 'Product name',
    })
    name: string;

    @IsOptional()
    slug: string
    
    @IsOptional()
    isActive: boolean

    @IsString()
    @ApiProperty({
        example: 'Minimalist design meets functionality with our Scandinavian Coffee Table. Made from sustainable oak wood with a natural finish, this table features clean lines and ample storage space underneath.Scandinavian Coffee Table',
        description: 'Description product',
    })
    description: string;

    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    @ApiPropertyOptional({
        example: [
        "313c4b79-5f1b-4250-881c-d5e8cbcea91c",
        "94c5b912-9828-4448-9de5-60abf6923a01"
        ],
    })
    tagIds?: string[];

    variants?: CreateProductVariantDto[];
}

export class CreateProductVariantDto {
  sizeId: string;            // tham chiếu ProductOption
  stock: number;
  price: number;
  discount?: number;
  images: string[];          // mảng đường dẫn ảnh đã upload
}