import { Portfolio } from '@Eva/Common/Entities/Portfolio';
import { Trade } from '@Eva/Common/Entities/Trade';
import { TradeService } from '@Eva/Trade/Services/Trade';
import { Repository } from 'typeorm';
import { Share } from '@Eva/Common/Entities/Share';
import { mock } from 'jest-mock-extended';
import { PortfolioNotFoundException } from '@Eva/Common/Exceptions/Portfolio/PortfolioNotFound';
import { ShareNotFoundException } from '@Eva/Common/Exceptions/Share/ShareNotFound';
import { ShareService } from '@Eva/Share/Services/Share';
import { PortfolioService } from '@Eva/Portfolio/Services/Portfolio';

describe('TradeService', () => {
  let tradeService: TradeService;
  let tradeRepository: Repository<Trade>;
  let portfolioService: PortfolioService;
  let shareService: ShareService;

  beforeEach(() => {
    tradeRepository = mock<Repository<Trade>>();
    portfolioService = mock<PortfolioService>();
    shareService = mock<ShareService>();
    tradeService = new TradeService(
      tradeRepository,
      portfolioService,
      shareService,
    );
  });

  it('should be defined', () => {
    expect(tradeService).toBeDefined();
  });

  describe('buyShare', () => {
    it('should create a trade if share and portfolio exists', async () => {
      const portfolioId = 1;
      const shareId = 1;
      const quantity = 1;
      const portfolio = new Portfolio();
      const share = new Share();
      const trade = new Trade();
      jest.spyOn(portfolioService, 'getPortfolio').mockResolvedValue(portfolio);
      jest.spyOn(shareService, 'getShare').mockResolvedValue(share);
      jest.spyOn(tradeRepository, 'save').mockResolvedValue(trade);
      await expect(
        tradeService.buyShare(portfolioId, shareId, quantity),
      ).resolves.toEqual(trade);
    });

    it('should throw PortfolioNotFoundException if portfolio not found', async () => {
      const portfolioId = 1;
      const shareId = 1;
      const quantity = 1;
      const share = new Share();
      jest
        .spyOn(portfolioService, 'getPortfolio')
        .mockRejectedValueOnce(new PortfolioNotFoundException(portfolioId));
      jest.spyOn(shareService, 'getShare').mockResolvedValue(share);
      await expect(
        tradeService.buyShare(portfolioId, shareId, quantity),
      ).rejects.toThrow(PortfolioNotFoundException);
    });
    it('should throw ShareNotFoundException if share not found', async () => {
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
  });
});
