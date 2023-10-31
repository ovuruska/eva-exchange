import { Global, Module } from '@nestjs/common';
import { LoggerService } from '@Eva/Providers/Logger/Service';

@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
