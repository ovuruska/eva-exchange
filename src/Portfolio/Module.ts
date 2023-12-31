import { forwardRef, Module } from '@nestjs/common';
import { PortfolioController } from '@Eva/Portfolio/Controllers/Portfolio';
import { PortfolioService } from '@Eva/Portfolio/Services/Portfolio';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from '@Eva/Common/Entities/Portfolio';
import { User } from '@Eva/Common/Entities/User';
import { TradeModule } from '@Eva/Trade/Module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Portfolio, User]),
    forwardRef(() => TradeModule),
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService],
  exports: [PortfolioService],
})
export class PortfolioModule {}
