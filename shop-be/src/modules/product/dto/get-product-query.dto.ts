import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetProductQueryDto {
  @ApiPropertyOptional({
    description: 'Từ khóa tìm kiếm theo tên sản phẩm',
    // example: 'iphone',
  })
  search?: string;

  @ApiPropertyOptional({
    description: 'ID bộ sưu tập',
    // example: 3,
  })
  collectionId?: string;

  @ApiPropertyOptional({
    description: 'ID tag',
    // example: 5,
  })
  tagId?: number;

  @ApiPropertyOptional({
    description: 'Giá tối thiểu',
    // example: 1000000,
  })
  minPrice?: number;

  @ApiPropertyOptional({
    description: 'Giá tối đa',
    // example: 20000000,
  })
  maxPrice?: number;

  @ApiPropertyOptional({
    description: 'Trang hiện tại',
    // example: 1,
  })
  page?: number;

  @ApiPropertyOptional({
    description: 'Số item mỗi trang',
    // example: 10,
  })
  limit?: number;

  @ApiPropertyOptional({
    description: 'Field sắp xếp',
    // example: 'createdAt',
  })
  sortBy?: string;

  @ApiPropertyOptional({
    description: 'Thứ tự sắp xếp',
    enum: ['ASC', 'DESC'],
    // example: 'DESC',
  })
  order?: 'ASC' | 'DESC';
}
