// upload.module.ts
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { LocalStorage } from './storage/local.storage';
import { STORAGE_PROVIDER } from './storage/storage.constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image])
  ],
  controllers: [UploadController],
  providers: [
    UploadService,
    {
      provide: STORAGE_PROVIDER,
      useClass: LocalStorage,
    },
  ],
  exports: [UploadService],
})
export class UploadModule {}
