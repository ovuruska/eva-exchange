import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trade } from '@Eva/Common/Entities/Trade';
import { Repository } from 'typeorm';
import { PortfolioNotFoundException } from '@Eva/Common/Exceptions/Portfolio/PortfolioNotFound';
import { TRADE_TYPE } from '@Eva/Common/Enums/TradeType';
import { ShareNotFoundException } from '@Eva/Common/Exceptions/Share/ShareNotFound';
import { PortfolioService } from '@Eva/Portfolio/Services/Portfolio';
import { ShareService } from '@Eva/Share/Services/Share';
import { PortfolioShareService } from '@Eva/Trade/Services/PortfolioShare';
import { InsufficientAmountOfShares } from '@Eva/Common/Exceptions/Trade/InsufficientAmountOfShares';

@Injectable()
export class TradeService {
  constructor(
    @InjectRepository(Trade)
    private readonly tradeRepository: Repository<Trade>,
    @Inject(forwardRef(() => PortfolioService))
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
    try {
      const trade = new Trade();

      const [portfolio, share] = await Promise.all([
        this.portfolioService.getPortfolio(portfolioId),
        this.shareService.getShare(shareId),
      ]);
      trade.tradeType = TRADE_TYPE.BUY;
      trade.quantity = quantity;
      trade.portfolio = portfolio;
      trade.share = share;
      trade.price = share.price;
      trade.tradeDate = new Date().toISOString().split('T')[0];
      trade.tradeTime = Date.now();

      await this.portfolioShareService.createOrUpdatePortfolioShare(
        portfolio,
        share,
        quantity,
      );
      await this.tradeRepository.save(trade);
      return trade;
    } catch (error) {
      if (error instanceof PortfolioNotFoundException)
        throw new PortfolioNotFoundException(portfolioId);
      else if (error instanceof ShareNotFoundException)
        throw new ShareNotFoundException(shareId);
      else throw new InternalServerErrorException(error.message);
    }
  }

  public async sellShare(
    portfolioId: number,
    shareId: number,
    quantity: number,
  ): Promise<Trade> {
    const portfolioShare = await this.portfolioShareService.getPortfolioShare(
      portfolioId,
      shareId,
    );
    if (portfolioShare.quantity < quantity) {
      throw new InsufficientAmountOfShares(
        portfolioId,
        shareId,
        portfolioShare.quantity,
      );
    }
    const trade = new Trade();
    trade.share = portfolioShare.share;
    trade.portfolio = portfolioShare.portfolio;
    trade.quantity = quantity;
    trade.price = portfolioShare.share.price;
    trade.tradeType = TRADE_TYPE.SELL;
    trade.tradeDate = new Date().toISOString().split('T')[0];
    trade.tradeTime = Date.now();
    portfolioShare.quantity -= quantity;
    await this.portfolioShareService.createOrUpdatePortfolioShare(
      portfolioShare.portfolio,
      portfolioShare.share,
      -quantity,
    );
    await this.tradeRepository.save(trade);
    return trade;
  }

  public async getTradeById(id: number): Promise<Trade> {
    return this.tradeRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  public async getTradesByPortfolioId(portfolioId: number): Promise<Trade[]> {
    return this.tradeRepository.find({
      where: {
        portfolio: {
          id: portfolioId,
        },
      },
    });
  }

  public async getTradesByUserId(userId: number): Promise<Trade[]> {
    return this.tradeRepository.find({
      where: {
        portfolio: {
          portfolioUser: {
            id: userId,
          },
        },
      },
    });
  }
}
