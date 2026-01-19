import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
    @ApiProperty({
        example: 'email@gmail.com',
        description: 'User email',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiPropertyOptional({
        example: 'John',
        description: 'First Name',
    })
    @IsString()
    firstName: string;

    @ApiPropertyOptional({
        example: 'Doe',
        description: 'Last Name',
    })
    @IsString()
    lastName: string;

    @ApiProperty({
        example: '123456',
        description: 'User password',
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        example: 'staff',
        description: 'Role',
    })
    @IsString()
    @IsNotEmpty()
    role: string
}