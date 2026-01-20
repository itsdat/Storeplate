import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateVoucherDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'SPLHPNY2026',
        description: 'Code',
    })
    code: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 100,
        description: 'Limit',
    })
    limit: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 10,
        description: 'Discount percentage',
    })
    discountPercentage: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 500,
        description: 'Min Order Total',
    })
    minOrderTotal: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 100,
        description: 'Max Discount',
    })
    maxDiscount: number;
}
