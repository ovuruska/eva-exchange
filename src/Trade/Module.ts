import { forwardRef, Module } from '@nestjs/common';
import { TradeService } from '@Eva/Trade/Services/Trade';
import { TradeController } from '@Eva/Trade/Controllers/Trade';
import { Trade } from '@Eva/Common/Entities/Trade';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioModule } from '@Eva/Portfolio/Module';
import { ShareModule } from '@Eva/Share/Module';
import { PortfolioShare } from '@Eva/Common/Entities/PortfolioShare';
import { PortfolioShareService } from '@Eva/Trade/Services/PortfolioShare';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trade, PortfolioShare]),
    forwardRef(() => PortfolioModule),
    forwardRef(() => ShareModule),
  ],
  controllers: [TradeController],
  providers: [TradeService, PortfolioShareService],
})
export class TradeModule {}
