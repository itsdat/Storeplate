import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { UserModule } from './modules/users/user.module';
import { AddressModule } from './modules/address/address.module';

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true, // Make the configuration globally available
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        entities: [User]
      })
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: process.env.NODE_ENV === 'production'
    //     ? '/app/uploads'
    //     : join(__dirname, '..', 'public'),
    //   serveRoot: '/uploads',
    // }),
    ServeStaticModule.forRoot({
  rootPath: '/uploads',
  serveRoot: '/uploads',
}),
    AuthModule,
    CollectionModule,
    ProductModule,
    TagModule,
    UploadModule,
    CartModule,
    VoucherModule,
    UserModule,
    AddressModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
