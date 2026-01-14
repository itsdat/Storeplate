import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTagDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Bedroom',
        description: 'Tag name',
    })
    label: string;

    @IsOptional()
    value: string;

    
}
