import { Controller, Post, Body, UseInterceptors, UploadedFile, UseGuards, Delete, Get, Param, BadRequestException } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadDto, UploadDtoWithFile } from './dto/upload.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RemoveFileDto } from './dto/remove.dto';
import { RemoveMultiDto } from './dto/remove-multi.dto';

@Controller('upload')
@ApiBearerAuth('access_token')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Upload a single file' })
  @ApiConsumes('multipart/form-data')  // ⚠ bắt buộc cho file upload
  @ApiBody({
    description: 'Upload file',
    type: UploadDtoWithFile,           // mình sẽ tạo ở bước 3
  })
  @UseInterceptors(FileInterceptor('file', {
    limits: {
      fileSize: 1 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(
            new BadRequestException('Only image files are allowed'),
            false,
          );
        }
        cb(null, true);
      },
  }))
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadDto,
  ) {
    return this.uploadService.uploadFile(file, dto, dto.folder);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Remove a file by key' })
  remove(@Body() dto: RemoveFileDto) {
    return this.uploadService.deleteFile(dto.key);
  }

  @Get('/find-multi/:folder')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get images by folder name' })
  findMulti(@Param('folder') folder: string){
    return this.uploadService.findImageByFolder(folder)
  }

  @Delete('/delete-multi')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Remove multiple files' })
  removeMulti(@Body() dto: RemoveMultiDto) {
    return this.uploadService.deleteFileMulti(dto.keys);
  }

}
