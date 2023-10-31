import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Length, Min } from 'class-validator';

@Entity('shares')
@Unique(['symbol'])
export class Share {
  @ApiProperty({
    description: 'Share Id',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Share symbol',
    example: 'TRY',
  })
  @Length(3)
  @Column({ length: 3 })
  symbol: string;

  @ApiProperty({
    description: 'Share price',
    example: 100,
  })
  @Min(0)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
