import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { CollectionModule } from './modules/collection/collection.module';
import { ProductModule } from './modules/product/product.module';
import { TagModule } from './modules/tag/tag.module';
import { UploadModule } from './modules/upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { User } from './modules/users/entities/user.entity';
import { CartModule } from './modules/cart/cart.module';
import { VoucherModule } from './modules/voucher/voucher.module';

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true, // Make the configuration globally available
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: [User]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // thư mục chứa file
      serveRoot: '/', // đường dẫn truy cập /avatars/... hoặc /products/...
    }),
    AuthModule,
    CollectionModule,
    ProductModule,
    TagModule,
    UploadModule,
    CartModule,
    VoucherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
