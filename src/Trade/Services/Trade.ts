import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trade } from '@Eva/Common/Entities/Trade';
import { Repository } from 'typeorm';
import { PortfolioNotFoundException } from '@Eva/Common/Exceptions/Portfolio/PortfolioNotFound';
import { TRADE_TYPE } from '@Eva/Common/Enums/TradeType';
import { ShareNotFoundException } from '@Eva/Common/Exceptions/Share/ShareNotFound';
import { PortfolioService } from '@Eva/Portfolio/Services/Portfolio';
import { ShareService } from '@Eva/Share/Services/Share';
import { PortfolioShare } from '@Eva/Common/Entities/PortfolioShare';
import { PortfolioShareService } from '@Eva/Trade/Services/PortfolioShare';

@Injectable()
export class TradeService {
  constructor(
    @InjectRepository(Trade)
    private readonly tradeRepository: Repository<Trade>,
    @InjectRepository(PortfolioShare)
    private readonly portfolioService: PortfolioService,
    @Inject(forwardRef(() => ShareService))
    private readonly shareService: ShareService,
    private readonly portfolioShareService: PortfolioShareService,
  ) {}

  public async buyShare(
    portfolioId: number,
    shareId: number,
    quantity: number,
  ): Promise<Trade> {
    const trade = new Trade();
    try {
      const [portfolio, share] = await Promise.all([
        this.portfolioService.getPortfolio(portfolioId),
        this.shareService.getShare(shareId),
      ]);
      trade.type = TRADE_TYPE.BUY;
      trade.quantity = quantity;
      trade.portfolio = portfolio;
      trade.share = share;
      trade.price = share.price;
      return this.tradeRepository.save(trade);
    } catch (error) {
      if (error instanceof PortfolioNotFoundException)
        throw new PortfolioNotFoundException(portfolioId);
      else if (error instanceof ShareNotFoundException)
        throw new ShareNotFoundException(shareId);
    }
  }

  public async sellShare(
    portfolioId: number,
    shareId: number,
    quantity: number,
  ): Promise<Trade> {
    const trade = new Trade();
    try {
      const [portfolio, share] = await Promise.all([
        this.portfolioService.getPortfolio(portfolioId),
        this.shareService.getShare(shareId),
      ]);
      trade.type = TRADE_TYPE.SELL;
      trade.quantity = quantity;
      trade.portfolio = portfolio;
      trade.share = share;
      trade.price = share.price;
      return this.tradeRepository.save(trade);
    } catch (error) {
      if (error instanceof PortfolioNotFoundException)
        throw new PortfolioNotFoundException(portfolioId);
      else if (error instanceof ShareNotFoundException)
        throw new ShareNotFoundException(shareId);
    }
  }
}
