import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveFileDto {
  @ApiProperty({ description: 'File key to delete', example: 'avatars/6536c415-3758-473f-b333-88e12a0c9261.jpg' })
  @IsNotEmpty()
  @IsString()
  key: string;
}
