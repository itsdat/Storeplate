// src/modules/upload/storage/local.storage.ts
import { Injectable } from '@nestjs/common';
import { StorageProvider } from './storage.interface';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LocalStorage implements StorageProvider {
  async upload(file: Express.Multer.File, folder = 'uploads') {
    const uploadPath = path.join(process.cwd(), 'public', folder);
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

    const ext = path.extname(file.originalname);
    const filename = `${uuid()}${ext}`;
    const fullPath = path.join(uploadPath, filename);
    fs.writeFileSync(fullPath, file.buffer);

    return {
      url: `/uploads/${folder}/${filename}`,
      key: `/uploads/${folder}/${filename}`,
    };
  }

  async delete(key: string) {
    const filePath = path.join(process.cwd(), 'public', key);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
}
