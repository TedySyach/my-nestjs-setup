# My Personal Nest JS Setup

Setup untuk membuat Backend dengan Nest JS

## Tech Stack

**Server:** Node, Nest JS, MinIo, Prisma ORM, PostgreSQL

## Installation

Install with pnpm

```bash
  pnpm install
```

## Database Setup

```bash
  // create model on prisma
  model Product {}

  // migrate
  npx prisma migrate dev

  // genereate prisma client
  npx prisma generate

  // [optional] if u want to see prisma client
  npx prisma studio

  // create prisma module
  nest g module prisma
  nest g service prisma

  // lalu buat module prisma sebagai @Global(), agar bisa di pakai di semua module

  // Create class that extends PrismaClient
  @Injectable()
  export class PrismaService extends PrismaClient {
     constructor() {
       super({
         datasources: {
           db: {
             url: 'postgresql://postgres:postgres@localhost:5432/shamo?schema=public',
           },
         },
       });
     }
   }
```

## Validation Pipe Setup

```bash
   // Instal Package
   yarn add class-validator class-transformer

   // contoh dto pada auth
   import { IsEmail, IsNotEmpty } from 'class-validator';

   export class AuthDto {
     @IsEmail()
     @IsNotEmpty()
     email: string;

   	 @IsString()
     @IsNotEmpty()
     password: string;
   }

   /* setelah membuat dto buat file index.ts pada folder dto dengan isi */
   export * from './auth.dto';

   // tambah validationpipe pada main.ts
   app.useGlobalPipes(new ValidationPipe({ whitelist:  true }));
```

## Response Formater

```bash
   // src/helper/response-formatter.ts

   export class ResponseFormatter {
     private static response = {
       meta: {
         code: 200,
         status: 'success',
         message: null,
       },
       data: null,
     };

     public static success(code: number,data: any = null, message: string = null) {
       this.response.meta.code = code;
	   this.response.meta.message = message;
       this.response.data = data;

       return this.buildResponse();
     }

     public static error(data: any = null, message: string = null, code: number = 400) {
       this.response.meta.status = 'error';
       this.response.meta.code = code;
       this.response.meta.message = message;
       this.response.data = data;

       return this.buildResponse();
     }

     private static buildResponse() {
       return {
         statusCode: this.response.meta.code,
         status: this.response.meta.status,
         message: this.response.meta.message,
         data: this.response.data,
       };
     }
   }
```
