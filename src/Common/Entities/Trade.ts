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
  type: TRADE_TYPE;

  @Column({ type: 'time', default: () => 'CURRENT_TIME' })
  time: Date;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  date: Date;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
