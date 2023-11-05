import { PortfolioService } from '@Eva/Portfolio/Services/Portfolio';
import { Portfolio } from '@Eva/Common/Entities/Portfolio';
import { Repository } from 'typeorm';
import { mock } from 'jest-mock-extended';
import { User } from '@Eva/Common/Entities/User';
import { UserNotFoundException } from '@Eva/Common/Exceptions/User/UserNotFound';

describe('PortfolioService', () => {
  let portfolioService: PortfolioService;
  let portfolioRepository: Repository<Portfolio>;
  let userRepository: Repository<User>;
  beforeEach(() => {
    portfolioRepository = mock<Repository<Portfolio>>();
    userRepository = mock<Repository<User>>();
    portfolioService = new PortfolioService(
      portfolioRepository,
      userRepository,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getUser', () => {
    it('should return user if exists', async () => {
      const user = new User();
      user.id = 1;
      jest.spyOn(userRepository, 'findOneOrFail').mockResolvedValueOnce(user);
      const userFound = await portfolioService.getUser(1);
      expect(userFound).toEqual(user);
    });
    it('should throw UserNotFoundException if user does not exist', async () => {
      jest
        .spyOn(userRepository, 'findOneOrFail')
        .mockRejectedValueOnce(null as any);
      await expect(portfolioService.getUser(1)).rejects.toThrow(
        'User with id 1 not found',
      );
    });
  });

  describe('createPortfolio', () => {
    it('should create portfolio if user exists and no portfolio with same portfolioName', async () => {
      const user = new User();
      user.id = 1;
      jest.spyOn(portfolioService, 'getUser').mockResolvedValueOnce(user);
      const portfolio = new Portfolio();
      portfolio.portfolioName = 'portfolio';
      portfolio.portfolioUser = user;
      jest.spyOn(portfolioRepository, 'save').mockResolvedValueOnce(portfolio);
      const createdPortfolio = await portfolioService.createPortfolio(
        'portfolio',
        1,
      );
      expect(createdPortfolio).toEqual(portfolio);
    });
    it('should throw PortfolioWithNameExistsException if portfolio with same name exists', async () => {
      const user = new User();
      user.id = 1;
      jest.spyOn(portfolioService, 'getUser').mockResolvedValueOnce(user);
      jest.spyOn(portfolioRepository, 'save').mockRejectedValueOnce({
        message: 'duplicate key value violates unique constraint',
      });
      await expect(
        portfolioService.createPortfolio('portfolio', 1),
      ).rejects.toThrow('Portfolio with name portfolio already exists');
    });
    it('should throw UserNotFoundException if user does not exist', async () => {
      jest
        .spyOn(portfolioService, 'getUser')
        .mockRejectedValueOnce(new UserNotFoundException(1));
      await expect(
        portfolioService.createPortfolio('portfolio', 1),
      ).rejects.toThrow(UserNotFoundException);
    });
  });

  describe('getUserPortfolios', () => {
    it('should return portfolios if user exists', async () => {
      const user = new User();
      user.id = 1;
      const portfolios = [
        {
          id: 1,
          name: 'portfolio',
        },
      ];
      jest.spyOn(portfolioService, 'getUser').mockResolvedValueOnce(user);
      jest
        .spyOn(portfolioRepository, 'find')
        .mockResolvedValueOnce(portfolios as any);
      const portfoliosFound = await portfolioService.getUserPortfolios(1);
      expect(portfoliosFound).toEqual(portfolios);
    });
    it('should throw UserNotFoundException if user does not exist', async () => {
      jest
        .spyOn(portfolioService, 'getUser')
        .mockRejectedValueOnce(new UserNotFoundException(1));
      await expect(portfolioService.getUserPortfolios(1)).rejects.toThrow(
        UserNotFoundException,
      );
    });
  });

  describe('getPortfolio', () => {
    it('should return portfolio if exists', async () => {
      const portfolio = new Portfolio();
      portfolio.id = 1;
      jest
        .spyOn(portfolioRepository, 'findOneOrFail')
        .mockResolvedValueOnce(portfolio);
      const portfolioFound = await portfolioService.getPortfolio(1);
      expect(portfolioFound).toEqual(portfolio);
    });
    it('should throw PortfolioNotFoundException if portfolio does not exist', async () => {
      jest
        .spyOn(portfolioRepository, 'findOneOrFail')
        .mockRejectedValueOnce(null as any);
      await expect(portfolioService.getPortfolio(1)).rejects.toThrow(
        'Portfolio with id 1 not found',
      );
    });
  });
});
