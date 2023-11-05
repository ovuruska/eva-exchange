import { Module } from '@nestjs/common';
import { HealthModule } from '@Eva/Health/Module';
import { AppConfigModule } from '@Eva/Providers/AppConfig/Module';
import { TypeOrmConfigModule } from '@Eva/Providers/TypeOrmConfig/Module';
import { LoggerModule } from '@Eva/Providers/Logger/Module';
import { PortfolioModule } from '@Eva/Portfolio/Module';
import { ShareModule } from '@Eva/Share/Module';
import { TradeModule } from '@Eva/Trade/Module';

@Module({
  imports: [
    HealthModule,
    AppConfigModule,
    TypeOrmConfigModule,
    LoggerModule,
    PortfolioModule,
    ShareModule,
    TradeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
