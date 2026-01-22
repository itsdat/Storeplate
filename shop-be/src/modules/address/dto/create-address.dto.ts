import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAddressDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Ho Chi Minh City',
        description: 'Province / City',
    })
    city: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Quan 7',
        description: 'District',
    })
    district: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Binh Thuan',
        description: 'Wards',
    })
    wards: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '999, Huynh Tan Phat street',
        description: 'street',
    })
    street: string;
}
