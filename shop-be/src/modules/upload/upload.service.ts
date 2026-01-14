import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import type { StorageProvider } from './storage/storage.interface';
import { STORAGE_PROVIDER } from './storage/storage.constants';
import { In, Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { UploadDto } from './dto/upload.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatusCode } from 'src/shared/enums/http-status.enum';

@Injectable()
export class UploadService {
  constructor(
    @Inject(STORAGE_PROVIDER)
    private readonly storage: StorageProvider,
    @InjectRepository(Image)
    private readonly uploadRepo: Repository<Image>
  ) {}

  async uploadFile(file: Express.Multer.File, uploadDto: UploadDto, folder?: string) {
    if (!file) throw new BadRequestException('File is required');
    const res = await this.storage.upload(file, folder)
    const image = this.uploadRepo.create(uploadDto)
    return await this.uploadRepo.save({...image, key: res.key, url: res.url});
  }

  async deleteFile(key: string) {
    if (this.storage.delete) await this.storage.delete(key);
    const image = await this.uploadRepo.find({where: {key}})
    if(!image){
      throw new NotFoundException("Image not found")
    }
    await this.uploadRepo.remove(image);
  }

  async findImageByFolder(folder: string){
    try {
      const data = await this.uploadRepo.find({
        where: {folder: folder},
        order: {createdAt: 'DESC'}
      })
      return {
        data: data,
        statusCode: HttpStatusCode.OK,
        totalItems: data.length
      }
    } catch (error) {
      console.log("error fetching", error);
      throw new BadRequestException("Fetching fail")
    }
  }

  async deleteFileMulti(keys: string[]) {
  if (!keys || keys.length === 0) {
    throw new BadRequestException('Keys is required');
  }

  const images = await this.uploadRepo.find({
    where: {
      key: In(keys),
    },
  });

  if (!images.length) {
    throw new NotFoundException('Images not found');
  }

  // xoá trên storage
  if (this.storage.delete) {
    await Promise.all(
      images.map((img) => this.storage.delete!(img.key)),
    );
  }

  // xoá DB
  await this.uploadRepo.remove(images);

  return {
    statusCode: HttpStatusCode.OK,
    deleted: images.length,
  };
}


}

