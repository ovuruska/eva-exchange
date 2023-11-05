/*
    portfolioId: number,
    shareId: number,
    quantity: number,
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export class TradeRequestDto {
  @ApiProperty({
    description: 'Portfolio Id',
    example: 1,
  })
  @IsNumber()
  @Transform(Number)
  portfolioId: number;

  @ApiProperty({
    description: 'Share Id',
    example: 1,
  })
  @IsNumber()
  @Transform(Number)
  shareId: number;

  @ApiProperty({
    description: 'Quantity',
    example: 1,
  })
  @IsPositive()
  @IsNumber()
  @Transform(Number)
  quantity: number;
}
