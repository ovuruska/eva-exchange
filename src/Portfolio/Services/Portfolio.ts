import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from '@Eva/Common/Entities/Portfolio';
import { Repository } from 'typeorm';
import { User } from '@Eva/Common/Entities/User';
import { UserNotFoundException } from '@Eva/Common/Exceptions/User/UserNotFound';
import { PartialPortfolioDto } from '@Eva/Portfolio/Dto/Responses/PartialPortfolioDto';
import { PortfolioWithNameExistsException } from '@Eva/Common/Exceptions/Portfolio/PortfolioWithNameExists';
import { PortfolioNotFoundException } from '@Eva/Common/Exceptions/Portfolio/PortfolioNotFound';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createPortfolio(
    name: string,
    userId: number,
  ): Promise<Portfolio> {
    const user = await this.getUser(userId);
    try {
      const portfolio = new Portfolio();
      portfolio.name = name;
      portfolio.user = user;
      await this.portfolioRepository.save(portfolio);
      return portfolio;
    } catch (error) {
      if (
        error?.message.includes(
          'duplicate key value violates unique constraint',
        )
      ) {
        throw new PortfolioWithNameExistsException(name);
      }
    }
  }

  public async getUserPortfolios(
    userId: number,
  ): Promise<PartialPortfolioDto[]> {
    const user = await this.getUser(userId);
    return this.portfolioRepository.find({
      where: {
        user,
      },
      select: ['id', 'name'],
    });
  }

  public async getPortfolio(id: number): Promise<Portfolio> {
    try {
      return await this.portfolioRepository.findOneOrFail({
        where: { id },
      });
    } catch {
      throw new PortfolioNotFoundException(id);
    }
  }

  public async getUser(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({
        where: { id },
      });
    } catch {
      throw new UserNotFoundException(id);
    }
  }
}
