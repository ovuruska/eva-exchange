import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PortfolioService } from '@Eva/Portfolio/Services/Portfolio';
import { Portfolio } from '@Eva/Common/Entities/Portfolio';
import { PartialPortfolioDto } from '@Eva/Portfolio/Dto/Responses/PartialPortfolioDto';
import { CreatePortfolioDto } from '@Eva/Portfolio/Dto/Requests/CreatePortfolioDto';

@Controller('portfolios')
@ApiTags('Portfolios')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get('/:userId')
  @ApiOperation({
    summary: 'Get user portfolios',
    description: 'Get all available user portfolios',
  })
  @ApiParam({
    name: 'userId',
    description: 'User Id',
    example: 1,
  })
  @ApiOkResponse({
    description: 'User portfolios',
    type: [PartialPortfolioDto],
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  public async getUserPortfolios(@Param('userId') userId: number) {
    return this.portfolioService.getUserPortfolios(userId);
  }

  @Post()
  @ApiOperation({
    summary: 'Create portfolio',
    description: 'Create new portfolio',
  })
  @ApiOkResponse({
    description: 'Created portfolio',
    type: Portfolio,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiConflictResponse({ description: 'Portfolio with name already exists.' })
  public async createPortfolio(@Body() request: CreatePortfolioDto) {
    const { name, userId } = request;
    return this.portfolioService.createPortfolio(name, userId);
  }
}
