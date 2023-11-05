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

@Entity('portfolio_shares')
@Unique(['portfolio', 'share'])
export class PortfolioShare {
  @PrimaryColumn()
  @ManyToOne(() => Portfolio, (portfolio) => portfolio.id)
  @JoinColumn({ name: 'portfolio' })
  portfolio: Portfolio;

  @PrimaryColumn()
  @ManyToOne(() => Share, (share) => share.id)
  @JoinColumn({ name: 'share' })
  share: Share;

  @Column({ type: 'integer' })
  quantity: number;
}
