import { Module } from '@nestjs/common';
import { HealthModule } from '@Eva/Health/Module';
import { AppConfigModule } from '@Eva/Providers/AppConfig/Module';
import { TypeOrmConfigModule } from '@Eva/Providers/TypeOrmConfig/Module';
import { LoggerModule } from '@Eva/Providers/Logger/Module';
import { PortfolioModule } from '@Eva/Portfolio/Module';

@Module({
  imports: [
    HealthModule,
    AppConfigModule,
    TypeOrmConfigModule,
    LoggerModule,
    PortfolioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
