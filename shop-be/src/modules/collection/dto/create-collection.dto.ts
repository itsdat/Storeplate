import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCollectionDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Featured Products',
        description: 'Collection name',
    })
    name: string;

    @IsOptional()
    slug: string

    @IsOptional()
    isActive: boolean

    @ApiProperty({
        example: '/products/445074e6-43f6-448e-a46c-81455447eb95.png',
        description: 'Image path',
    })
    @IsString()
    image: string
}
