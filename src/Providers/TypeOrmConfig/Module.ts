import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '@Eva/Providers/AppConfig/Module';
import { TypeOrmConfigService } from '@Eva/Providers/TypeOrmConfig/Service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useClass: TypeOrmConfigService,
    }),
  ],
  providers: [TypeOrmConfigService],
  exports: [TypeOrmModule],
})
export class TypeOrmConfigModule {}
