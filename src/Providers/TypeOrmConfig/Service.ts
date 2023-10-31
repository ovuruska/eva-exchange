import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import path from 'node:path';
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('DB_TYPE'),
      host: this.configService.get('DB_HOST'),
      port: +this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD') as string,
      database: this.configService.get('DB_DATABASE'),
      /* eslint-disable-next-line unicorn/prefer-module */
      entities: [__dirname + '../../../**/Entities/*.{js,ts}'],
      synchronize: true,
    } as TypeOrmModuleOptions;
  }
}
