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
      return this.portfolioShareRepository.save(portfolioShare);
    } catch (error) {
      if (error instanceof PortfolioShareNotFoundException) {
        const newPortfolioShare = new PortfolioShare();
        newPortfolioShare.portfolio = portfolio;
        newPortfolioShare.share = share;
        newPortfolioShare.quantity = quantity;
        return this.portfolioShareRepository.save(newPortfolioShare);
      }
    }
  }

  public async getPortfolioShare(
    portfolioId: number,
    shareId: number,
  ): Promise<PortfolioShare> {
    try {
      return this.portfolioShareRepository.findOneOrFail({
        where: {
          portfolio: {
            id: portfolioId,
          },
          share: {
            id: shareId,
          },
        },
      });
    } catch {
      throw new PortfolioShareNotFoundException(portfolioId, shareId);
    }
  }

  public async getPortfolioSharesByPortfolioId(
    portfolioId: number,
  ): Promise<PortfolioShare[]> {
    return this.portfolioShareRepository.find({
      where: {
        portfolio: {
          id: portfolioId,
        },
      },
    });
  }

  public async getPortfolioSharesByUserId(
    userId: number,
  ): Promise<PortfolioShare[]> {
    return this.portfolioShareRepository.find({
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
