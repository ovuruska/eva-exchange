import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('trades')
@ApiTags('trades')
export class TradeController {}
