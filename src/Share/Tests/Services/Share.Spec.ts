import { ShareService } from '@Eva/Share/Services/Share';
import { Repository } from 'typeorm';
import { Share } from '@Eva/Common/Entities/Share';
import { mock } from 'jest-mock-extended';
import { ShareNotFoundException } from '@Eva/Common/Exceptions/Share/ShareNotFound';

describe('ShareService', () => {
  let shareService: ShareService;
  let shareRepository: Repository<Share>;
  beforeEach(async () => {
    shareRepository = mock<Repository<Share>>();
    shareService = new ShareService(shareRepository);
  });

  it('should be defined', () => {
    expect(shareService).toBeDefined();
  });
  describe('createShare', () => {
    it('should create a new share with symbol and price if not exists', async () => {
      const symbol = 'TRY';
      const price = 1;
      jest.spyOn(shareRepository, 'save').mockResolvedValueOnce({
        symbol,
        price,
      } as any);

      const result = await shareService.createShare(symbol, price);
      expect(result).toBeDefined();
      expect(result.symbol).toBe(symbol);
      expect(result.price).toBe(price);
    });
    it('should throw an error if share with symbol exists', async () => {
      const symbol = 'TRY';
      const price = 1;
      jest.spyOn(shareRepository, 'save').mockRejectedValueOnce({
        message: 'duplicate key value violates unique constraint',
      } as any);

      await expect(shareService.createShare(symbol, price)).rejects.toThrow(
        `Share with symbol ${symbol} already exists.`,
      );
    });
  });
  describe('updateShare', () => {
    it('should update share price if share exists', async () => {
      const id = 1;
      const price = 1;
      const share = new Share();
      jest.spyOn(shareService, 'getShare').mockResolvedValueOnce(share);
      jest.spyOn(shareRepository, 'save').mockResolvedValueOnce({
        id,
        price,
      } as any);

      const result = await shareService.updateShare(id, price);
      expect(result).toBeDefined();
      expect(result.id).toBe(id);
      expect(result.price).toBe(price);
    });

    it('should throw ShareNotFoundException if share does not exist', async () => {
      const id = 1;
      const price = 1;
      jest
        .spyOn(shareService, 'getShare')
        .mockRejectedValueOnce(new ShareNotFoundException(id));

      await expect(shareService.updateShare(id, price)).rejects.toThrow(
        ShareNotFoundException,
      );
    });
  });
  describe('getShare', () => {
    it('should return share if exists', async () => {
      const id = 1;
      const price = 1;
      jest.spyOn(shareRepository, 'findOneOrFail').mockResolvedValueOnce({
        id,
        price,
      } as any);

      const result = await shareService.getShare(id);
      expect(result).toBeDefined();
      expect(result.id).toBe(id);
      expect(result.price).toBe(price);
    });
    it('should throw ShareNotFoundException if share does not exist', async () => {
      const id = 1;
      jest
        .spyOn(shareRepository, 'findOneOrFail')
        .mockRejectedValueOnce(undefined as any);

      await expect(shareService.getShare(id)).rejects.toThrow(
        ShareNotFoundException,
      );
    });
  });
});
