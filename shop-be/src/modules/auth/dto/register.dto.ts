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
        example: 'username_123abc',
        description: 'Username (auto-generated if not provided)',
    })
    @IsString()
    username: string;

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