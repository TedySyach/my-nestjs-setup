import { Module } from '@nestjs/common';
import { MinioClientModule } from './minio-client/minio-client.module';
import { UploadFileModule } from './upload-file/upload-file.module';

@Module({
  imports: [MinioClientModule, UploadFileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
