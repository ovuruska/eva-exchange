import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { Portfolio } from '@Eva/Common/Entities/Portfolio';
import { Share } from '@Eva/Common/Entities/Share';
import { ApiProperty } from '@nestjs/swagger';

@Entity('portfolio_shares')
@Unique(['portfolio', 'share'])
export class PortfolioShare {
  @PrimaryColumn()
  @ManyToOne(() => Portfolio, (portfolio) => portfolio.id)
  @JoinColumn({ name: 'portfolio' })
  @ApiProperty({
    description: 'Portfolio',
    example: {
      id: 1,
      portfolioName: 'My TRY portfolio',
    },
    type: Portfolio,
  })
  portfolio: Portfolio;

  @PrimaryColumn()
  @ManyToOne(() => Share, (share) => share.id)
  @JoinColumn({ name: 'share' })
  @ApiProperty({
    description: 'Share',
    example: {
      id: 1,
      shareName: 'TRY',
    },
    type: Share,
  })
  share: Share;

  @Column({ type: 'integer' })
  @ApiProperty({
    description: 'Quantity',
    example: 10,
  })
  quantity: number;
}
