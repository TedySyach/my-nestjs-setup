import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { Config } from './config';
import { BufferedFile } from './file-model';

@Injectable()
export class MinioClientService {
  constructor(private readonly minio: MinioService) {}

  private readonly logger: Logger;
  private readonly baseBucket = Config.MINIO_BUCKET;

  public async get(name: string) {
    const image = await this.minio.client.getObject(this.baseBucket, name);
    return image;
  }

  public async uploadFile(path = '', file: BufferedFile, name: string) {
    const tempFileName = Date.now().toString();

    if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    }

    // Get file extension
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );

    // Set filename in S3
    const fileName = `${name}${ext}`;
    const fileBuffer = file.buffer;

    const putObject = new Promise((resolve, reject) => {
      this.minio.client.putObject(
        this.baseBucket,
        `${path}/${fileName}`,
        fileBuffer,
        function (err, res) {
          if (err) reject(err);
          resolve(res);
        },
      );
    });

    await putObject;

    return {
      url: `${path}/${fileName}`,
    };
  }

  public async upload(path = '', file: BufferedFile, prefixName: string) {
    if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    }

    const tempFileName = Date.now().toString();

    const ext = '.jpg';

    // Set filename in S3
    const fileName = `${prefixName}-${tempFileName}${ext}`;
    const fileBuffer = file.buffer;

    // const fileBuffer = file.buffer;
    const putObject = new Promise((resolve, reject) => {
      this.minio.client.putObject(
        this.baseBucket,
        `${path}/${fileName}`,
        fileBuffer,
        //metaData,
        function (err, res) {
          if (err) reject(err);
          resolve(res);
        },
      );
    });

    await putObject;

    return {
      url: `${path}/${fileName}`,
    };
  }

  async delete(objetName: string, baseBucket: string = this.baseBucket) {
    this.minio.client.removeObject(baseBucket, objetName, function (err) {
      if (err) {
        this.logger.error(err);
      }
    });
  }
}
