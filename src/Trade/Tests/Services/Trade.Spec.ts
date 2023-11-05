import { PortfolioService } from '@Eva/Portfolio/Services/Portfolio';
import { ShareService } from '@Eva/Share/Services/Share';
import { TradeService } from '@Eva/Trade/Services/Trade';
import { mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { Trade } from '@Eva/Common/Entities/Trade';
import { PortfolioShareService } from '@Eva/Trade/Services/PortfolioShare';
import { PortfolioNotFoundException } from '@Eva/Common/Exceptions/Portfolio/PortfolioNotFound';
import { Portfolio } from '@Eva/Common/Entities/Portfolio';
import { ShareNotFoundException } from '@Eva/Common/Exceptions/Share/ShareNotFound';
import { Share } from '@Eva/Common/Entities/Share';
import { TRADE_TYPE } from '@Eva/Common/Enums/TradeType';
import { PortfolioShare } from '@Eva/Common/Entities/PortfolioShare';
import { InsufficientAmountOfShares } from '@Eva/Common/Exceptions/Trade/InsufficientAmountOfShares';

describe('TradeService', () => {
  let portfolioService: PortfolioService;
  let shareService: ShareService;
  let portfolioShareService: PortfolioShareService;
  let tradeRepository: Repository<Trade>;
  let tradeService: TradeService;

  beforeEach(async () => {
    portfolioService = mock<PortfolioService>();
    shareService = mock<ShareService>();
    portfolioShareService = mock<PortfolioShareService>();
    tradeRepository = mock<Repository<Trade>>();
    tradeService = new TradeService(
      tradeRepository,
      portfolioService,
      shareService,
      portfolioShareService,
    );
  });

  describe('buyShare', () => {
    it('should throw PortfolioNotFoundException if portfolio does not exist', async () => {
      const portfolioId = 1;
      const shareId = 1;
      const quantity = 1;
      jest
        .spyOn(portfolioService, 'getPortfolio')
        .mockRejectedValueOnce(new PortfolioNotFoundException(portfolioId));
      await expect(
        tradeService.buyShare(portfolioId, shareId, quantity),
      ).rejects.toThrow(PortfolioNotFoundException);
    });

    it('should throw ShareNotFoundException if share does not exist', async () => {
      const portfolioId = 1;
      const shareId = 1;
      const quantity = 1;
      const portfolio = new Portfolio();
      jest.spyOn(portfolioService, 'getPortfolio').mockResolvedValue(portfolio);
      jest
        .spyOn(shareService, 'getShare')
        .mockRejectedValueOnce(new ShareNotFoundException(shareId));
      await expect(
        tradeService.buyShare(portfolioId, shareId, quantity),
      ).rejects.toThrow(ShareNotFoundException);
    });

    it('should create a trade if portfolio and share exist', async () => {
      const portfolioId = 1;
      const shareId = 1;
      const quantity = 1;
      const portfolio = new Portfolio();
      const share = new Share();
      const trade = new Trade();
      const portfolioShare = mock<PortfolioShare>();
      trade.share = share;
      trade.portfolio = portfolio;
      trade.quantity = quantity;
      trade.price = share.price;
      trade.tradeType = TRADE_TYPE.BUY;
      jest
        .spyOn(portfolioService, 'getPortfolio')
        .mockResolvedValueOnce(portfolio);
      jest.spyOn(shareService, 'getShare').mockResolvedValueOnce(share);
      jest.spyOn(tradeRepository, 'save').mockResolvedValueOnce(trade);
      jest
        .spyOn(portfolioShareService, 'createOrUpdatePortfolioShare')
        .mockResolvedValue(portfolioShare);
      await expect(
        tradeService.buyShare(portfolioId, shareId, quantity),
      ).resolves.toEqual(trade);
    });
  });

  describe('sellShare', () => {
    it('should throw PortfolioNotFoundException if portfolio does not exist', async () => {
      const portfolioId = 1;
      const shareId = 1;
      const quantity = 1;
      jest
        .spyOn(portfolioShareService, 'getPortfolioShare')
        .mockRejectedValueOnce(new PortfolioNotFoundException(portfolioId));
      await expect(
        tradeService.sellShare(portfolioId, shareId, quantity),
      ).rejects.toThrow(PortfolioNotFoundException);
    });

    it('should throw InsufficientAmountOfShares if there are not enough shares', async () => {
      const portfolioId = 1;
      const shareId = 1;
      const quantity = 1;
      const portfolio = new Portfolio();
      const share = new Share();
      const portfolioShare = mock<PortfolioShare>();
      portfolioShare.quantity = 0;
      jest.spyOn(portfolioService, 'getPortfolio').mockResolvedValue(portfolio);
      jest.spyOn(shareService, 'getShare').mockResolvedValue(share);
      jest
        .spyOn(portfolioShareService, 'getPortfolioShare')
        .mockResolvedValue(portfolioShare);
      await expect(
        tradeService.sellShare(portfolioId, shareId, quantity),
      ).rejects.toThrow(InsufficientAmountOfShares);
    });

    it('should create a trade if portfolio and share exist', async () => {
      const quantity = 1;
      const portfolio = new Portfolio();
      const share = new Share();
      const trade = new Trade();
      const portfolioShare = mock<PortfolioShare>();
      portfolioShare.quantity = 1;
      trade.share = share;
      trade.portfolio = portfolio;
      trade.quantity = quantity;
      trade.price = share.price;
      trade.tradeType = TRADE_TYPE.SELL;
      jest.spyOn(portfolioService, 'getPortfolio').mockResolvedValue(portfolio);
      jest.spyOn(shareService, 'getShare').mockResolvedValue(share);
      jest.spyOn(tradeRepository, 'save').mockResolvedValueOnce(trade);
      jest
        .spyOn(portfolioShareService, 'getPortfolioShare')
        .mockResolvedValue(portfolioShare);
    });
  });
  describe('getTradeById', () => {
    it('should return a trade if it exists', async () => {
      const id = 1;
      const trade = new Trade();
      jest.spyOn(tradeRepository, 'findOneOrFail').mockResolvedValue(trade);
      await expect(tradeService.getTradeById(id)).resolves.toEqual(trade);
    });
  });
  describe('getTradesByPortfolioId', () => {
    it('should return a trade if it exists', async () => {
      const portfolioId = 1;
      const trade = new Trade();
      jest.spyOn(tradeRepository, 'find').mockResolvedValue([trade]);
      await expect(
        tradeService.getTradesByPortfolioId(portfolioId),
      ).resolves.toEqual([trade]);
    });
    it('should return an empty array if no trades exist', async () => {
      const portfolioId = 1;
      jest.spyOn(tradeRepository, 'find').mockResolvedValue([]);
      await expect(
        tradeService.getTradesByPortfolioId(portfolioId),
      ).resolves.toEqual([]);
    });
  });
  describe('getTradesByUserId', () => {
    it('should return a trade if it exists', async () => {
      const userId = 1;
      const trade = new Trade();
      jest.spyOn(tradeRepository, 'find').mockResolvedValue([trade]);
      await expect(tradeService.getTradesByUserId(userId)).resolves.toEqual([
        trade,
      ]);
    });
    it('should return an empty array if no trades exist', async () => {
      const userId = 1;
      jest.spyOn(tradeRepository, 'find').mockResolvedValue([]);
      await expect(tradeService.getTradesByUserId(userId)).resolves.toEqual([]);
    });
  });
});
