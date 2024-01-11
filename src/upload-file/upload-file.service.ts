import { Injectable } from '@nestjs/common';
import { BufferedFile } from 'src/minio-client/file-model';
import { MinioClientService } from 'src/minio-client/minio-client.service';

@Injectable()
export class UploadFileService {
  constructor(private minioClientService: MinioClientService) {}

  async uploadSingle(path: string, image: BufferedFile, prefix: string) {
    try {
      const uploaded_image = await this.minioClientService.upload(
        path,
        image,
        prefix,
      );
      return {
        image_url: uploaded_image.url,
        message: 'Successfully uploaded',
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
