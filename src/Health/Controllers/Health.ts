import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthService } from '@Eva/Health/Services/Health';

@Controller('health')
@ApiTags('Health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @ApiOperation({
    summary: 'Check the health of the service',
    description: 'Check the health of the service',
  })
  @ApiOkResponse({
    description: 'The service is healthy',
  })
  @Get()
  check() {
    return this.healthService.check();
  }
}
