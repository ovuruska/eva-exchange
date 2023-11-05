import { PortfolioShare } from '@Eva/Common/Entities/PortfolioShare';
import { Share } from '@Eva/Common/Entities/Share';
import { Portfolio } from '@Eva/Common/Entities/Portfolio';
import { PortfolioShareNotFoundException } from '@Eva/Common/Exceptions/Trade/PortfolioShareNotFound';
import { PortfolioShareService } from '@Eva/Trade/Services/PortfolioShare';
import { Repository } from 'typeorm';
import { mock } from 'jest-mock-extended';

describe('PortfolioShareService', () => {
  let portfolioShareService: PortfolioShareService;
  let portfolioShareRepository: Repository<PortfolioShare>;

  beforeEach(() => {
    portfolioShareRepository = mock<Repository<PortfolioShare>>();
    portfolioShareService = new PortfolioShareService(portfolioShareRepository);
  });

  it('should be defined', () => {
    expect(portfolioShareService).toBeDefined();
  });

  describe('createOrUpdatePortfolioShare', () => {
    it('should create a new portfolio share if it does not exist', async () => {
      const portfolio = new Portfolio();
      const share = new Share();
      const quantity = 1;
      const portfolioShare = new PortfolioShare();
      portfolioShare.portfolio = portfolio;
      portfolioShare.share = share;
      portfolioShare.quantity = quantity;
      jest
        .spyOn(portfolioShareService, 'getPortfolioShare')
        .mockRejectedValueOnce(
          new PortfolioShareNotFoundException(portfolio.id, share.id),
        );
      jest
        .spyOn(portfolioShareRepository, 'save')
        .mockResolvedValue(portfolioShare);
      await expect(
        portfolioShareService.createOrUpdatePortfolioShare(
          portfolio,
          share,
          quantity,
        ),
      ).resolves.toEqual(portfolioShare);
    });

    it('should update a portfolio share if it exists', async () => {
      const portfolio = new Portfolio();
      const share = new Share();
      const quantity = 1;
      const portfolioShare = new PortfolioShare();
      portfolioShare.portfolio = portfolio;
      portfolioShare.share = share;
      portfolioShare.quantity = quantity;
      jest
        .spyOn(portfolioShareService, 'getPortfolioShare')
        .mockResolvedValue(portfolioShare);
      jest
        .spyOn(portfolioShareRepository, 'save')
        .mockResolvedValue(portfolioShare);
      await expect(
        portfolioShareService.createOrUpdatePortfolioShare(
          portfolio,
          share,
          quantity,
        ),
      ).resolves.toEqual(portfolioShare);
    });
  });

  describe('getPortfolioShare', () => {
    it('should return a portfolio share if it exists', async () => {
      const portfolioId = 1;
      const shareId = 1;
      const portfolioShare = new PortfolioShare();
      jest
        .spyOn(portfolioShareRepository, 'findOneOrFail')
        .mockResolvedValue(portfolioShare);
      await expect(
        portfolioShareService.getPortfolioShare(portfolioId, shareId),
      ).resolves.toEqual(portfolioShare);
    });
    it('should throw PortfolioShareNotFoundException if it does not exist', async () => {
      const portfolioId = 1;
      const shareId = 1;
      jest
        .spyOn(portfolioShareRepository, 'findOneOrFail')
        .mockRejectedValueOnce(
          new PortfolioShareNotFoundException(portfolioId, shareId),
        );
      await expect(
        portfolioShareService.getPortfolioShare(portfolioId, shareId),
      ).rejects.toThrow(PortfolioShareNotFoundException);
    });
  });
});
