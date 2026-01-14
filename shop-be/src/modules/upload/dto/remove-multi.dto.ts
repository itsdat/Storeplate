import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class RemoveMultiDto {
  @ApiProperty({
    example: ['avatars/abc.jpg', 'avatars/xyz.jpg'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  keys: string[];
}
