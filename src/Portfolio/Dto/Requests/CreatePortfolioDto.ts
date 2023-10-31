import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

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
