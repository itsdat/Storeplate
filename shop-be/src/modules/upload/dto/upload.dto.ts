import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UploadDto {
    @ApiProperty({
        example: 'avatars',
        description: 'Folder name',
    })
    @IsOptional()
    @IsString()
     folder?: string; // products, avatars, banners...
}

export class UploadDtoWithFile extends UploadDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: any; // ⚠ kiểu 'binary' là bắt buộc để Swagger hiển thị file input
}
