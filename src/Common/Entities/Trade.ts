import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Portfolio } from '@Eva/Common/Entities/Portfolio';
import { Share } from '@Eva/Common/Entities/Share';
import { TRADE_TYPE } from '@Eva/Common/Enums/TradeType';

@Entity('trades')
export class Trade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.id)
  @JoinColumn({ name: 'portfolio' })
  portfolio: Portfolio;

  @ManyToOne(() => Share, (share) => share.id)
  @JoinColumn({ name: 'share' })
  share: Share;

  @Column({
    type: 'enum',
    enum: TRADE_TYPE,
  })
  tradeType: TRADE_TYPE;

  @Column({
    type: 'bigint',
  })
  tradeTime: number;

  @Column({
    default: () => new Date().toISOString().split('T')[0],
  })
  tradeDate: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
