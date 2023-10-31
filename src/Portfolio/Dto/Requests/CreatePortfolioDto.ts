import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { Int32 } from 'typeorm';

export class CreatePortfolioDto {
  @ApiProperty({
    description: 'Portfolio name',
    example: 'My TRY portfolio',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 64)
  name: string;

  @ApiProperty({
    description: 'User Id',
    example: 1,
  })
  @IsNumber()
  userId: number;
}
