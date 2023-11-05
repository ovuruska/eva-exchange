import { OmitType } from '@nestjs/swagger';
import { Portfolio } from '@Eva/Common/Entities/Portfolio';

export class PartialPortfolioDto extends OmitType(Portfolio, [
  'portfolioUser',
]) {}
