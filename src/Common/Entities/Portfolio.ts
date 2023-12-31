import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from '@Eva/Common/Entities/User';
import { ApiProperty } from '@nestjs/swagger';
@Entity('portfolios')
@Unique(['portfolioUser', 'portfolioName'])
export class Portfolio {
  @ApiProperty({
    description: 'Portfolio Id',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'User',
    example: {
      id: 1,
      username: 'test',
    },
    type: User,
  })
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  portfolioUser: User;

  @ApiProperty({
    description: 'Portfolio name',
    example: 'My TRY portfolio',
  })
  @Column({ length: 64, name: 'portfolioname' })
  portfolioName: string;
}
