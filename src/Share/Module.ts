import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Share } from '@Eva/Common/Entities/Share';
import { ShareController } from '@Eva/Share/Controllers/Share';
import { ShareService } from '@Eva/Share/Services/Share';

@Module({
  imports: [TypeOrmModule.forFeature([Share])],
  controllers: [ShareController],
  providers: [ShareService],
  exports: [ShareService],
})
export class ShareModule {}
