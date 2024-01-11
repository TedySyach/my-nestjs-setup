import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { MinioModule } from 'nestjs-minio-client';
import { Config } from './config';

@Module({
  imports: [
    MinioModule.register({
      endPoint: Config.MINIO_ENDPOINT,
      port: Config.MINIO_PORT,
      accessKey: Config.MINIO_ACCESSKEY,
      secretKey: Config.MINIO_SECRETKEY,
      useSSL: false,
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}
