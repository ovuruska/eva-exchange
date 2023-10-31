import { Module } from '@nestjs/common';
import { HealthService } from '@Eva/Health/Services/Health';
import { HealthController } from '@Eva/Health/Controllers/Health';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  exports: [HealthService],
  providers: [HealthService],
  controllers: [HealthController],
  imports: [TerminusModule],
})
export class HealthModule {}
