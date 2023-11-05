import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Share } from '@Eva/Common/Entities/Share';
import { Repository } from 'typeorm';
import { ShareWithSymbolExistsException } from '@Eva/Common/Exceptions/Share/ShareWithSymbolExists';
import { ShareNotFoundException } from '@Eva/Common/Exceptions/Share/ShareNotFound';

@Injectable()
export class ShareService {
  constructor(
    @InjectRepository(Share)
    private readonly shareRepository: Repository<Share>,
  ) {}

  public async createShare(symbol: string, price: number) {
    const share = new Share();
    share.symbol = symbol;
    share.price = price;
    try {
      await this.shareRepository.save(share);
      return share;
    } catch (error) {
      if (
        error?.message.includes(
          'duplicate key value violates unique constraint',
        )
      ) {
        throw new ShareWithSymbolExistsException(symbol);
      }
    }
  }

  public async updateShare(id: number, price: number): Promise<Share> {
    const share = await this.getShare(id);
    share.price = price;
    return await this.shareRepository.save(share);
  }

  public async getShare(id: number): Promise<Share> {
    try {
      return await this.shareRepository.findOneOrFail({
        where: { id },
      });
    } catch {
      throw new ShareNotFoundException(id);
    }
  }
}
