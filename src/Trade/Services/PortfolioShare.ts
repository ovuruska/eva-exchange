import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PortfolioShare } from '@Eva/Common/Entities/PortfolioShare';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from '@Eva/Common/Entities/Portfolio';
import { Share } from '@Eva/Common/Entities/Share';
import { PortfolioShareNotFoundException } from '@Eva/Common/Exceptions/Trade/PortfolioShareNotFound';

@Injectable()
export class PortfolioShareService {
  constructor(
    @InjectRepository(PortfolioShare)
    private readonly portfolioShareRepository: Repository<PortfolioShare>,
  ) {}

  public async createOrUpdatePortfolioShare(
    portfolio: Portfolio,
    share: Share,
    quantity: number,
  ): Promise<PortfolioShare> {
    try {
      const portfolioShare = await this.getPortfolioShare(
        portfolio.id,
        share.id,
      );
      portfolioShare.quantity += quantity;
      await this.portfolioShareRepository.save(portfolioShare);
      return portfolioShare;
    } catch (error) {
      if (error instanceof PortfolioShareNotFoundException) {
        const newPortfolioShare = new PortfolioShare();
        newPortfolioShare.portfolio = portfolio;
        newPortfolioShare.share = share;
        newPortfolioShare.quantity = quantity;
        await this.portfolioShareRepository.save(newPortfolioShare);
        return newPortfolioShare;
      }
    }
  }

  public async getPortfolioShare(
    portfolioId: number,
    shareId: number,
  ): Promise<PortfolioShare> {
    try {
      return await this.portfolioShareRepository
        .createQueryBuilder('portfolioShare')
        .innerJoinAndSelect(
          'portfolioShare.portfolio',
          'portfolio',
          'portfolio.id = :portfolioId',
          { portfolioId },
        )
        .innerJoinAndSelect(
          'portfolioShare.share',
          'share',
          'share.id = :shareId',
          { shareId },
        )
        .getOneOrFail();
    } catch {
      throw new PortfolioShareNotFoundException(portfolioId, shareId);
    }
  }

  public async getPortfolioSharesByPortfolioId(
    portfolioId: number,
  ): Promise<PortfolioShare[]> {
    return this.portfolioShareRepository
      .createQueryBuilder('portfolioShare')
      .innerJoinAndSelect(
        'portfolioShare.portfolio',
        'portfolio',
        'portfolio.id = :portfolioId',
        { portfolioId },
      )
      .getMany();
  }
  public async getPortfolioSharesByUserId(
    userId: number,
  ): Promise<PortfolioShare[]> {
    return this.portfolioShareRepository
      .createQueryBuilder('portfolioShare')
      .innerJoinAndSelect('portfolioShare.portfolio', 'portfolio')
      .innerJoinAndSelect(
        'portfolio.portfolioUser',
        'portfolioUser',
        'portfolioUser.id = :userId',
        { userId },
      )
      .getMany();
  }
}
