import { HealthCheckService } from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  constructor(private health: HealthCheckService) {}

  check() {
    return this.health.check([]);
  }
}
