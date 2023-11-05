import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
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
import { PortfolioShareService } from '@Eva/Trade/Services/PortfolioShare';
import { PortfolioShare } from '@Eva/Common/Entities/PortfolioShare';

@Controller('portfolios')
@ApiTags('Portfolios')
export class PortfolioController {
  constructor(
    private readonly portfolioService: PortfolioService,
    @Inject(forwardRef(() => PortfolioShareService))
    private readonly portfolioShareService: PortfolioShareService,
  ) {}

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

  @Get('/shares/:portfolioId')
  @ApiOperation({
    summary: 'Get portfolio shares',
    description: 'Get all available portfolio shares',
  })
  @ApiParam({
    name: 'portfolioId',
    description: 'Portfolio Id',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Portfolio shares',
    type: [PortfolioShare],
  })
  public async getPortfolioSharesByPortfolioId(
    @Param('portfolioId') portfolioId: number,
  ) {
    return this.portfolioShareService.getPortfolioSharesByPortfolioId(
      portfolioId,
    );
  }

  @Get('/shares/user/:userId')
  @ApiOperation({
    summary: 'Get user portfolio shares',
    description: 'Get all available user portfolio shares',
  })
  @ApiParam({
    name: 'userId',
    description: 'User Id',
    example: 1,
  })
  @ApiOkResponse({
    description: 'User portfolio shares',
    type: [PortfolioShare],
  })
  public async getPortfolioSharesByUserId(@Param('userId') userId: number) {
    return this.portfolioShareService.getPortfolioSharesByUserId(userId);
  }
}
