import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UserDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'John',
        description: 'First name',
    })
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Doe',
        description: 'Last name',
    })
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '0736734634',
        description: 'Phone Number',
    })
    phone: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '/avatar/32479-324hf23-4234-2342.png',
        description: 'Avatar URL',
    })
    avatar: string;
}