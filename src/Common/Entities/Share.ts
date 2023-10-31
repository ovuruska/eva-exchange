import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('shares')
@Unique(['symbol'])
export class Share {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 3 })
  symbol: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
