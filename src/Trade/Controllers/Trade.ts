import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { TradeService } from '@Eva/Trade/Services/Trade';
import { TradeRequestDto } from '@Eva/Trade/Dto/Requests/TradeRequestDto';

@Controller('trades')
@ApiTags('Trades')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Post('operations/buy')
  @ApiOperation({ summary: 'Buy a share' })
  @ApiOkResponse({ description: 'The share has been successfully bought.' })
  @ApiNotFoundResponse({ description: 'The share does not exist.' })
  @ApiNotFoundResponse({ description: 'The portfolio does not exist.' })
  public async buyShare(@Body() request: TradeRequestDto) {
    const { portfolioId, shareId, quantity } = request;
    return this.tradeService.buyShare(portfolioId, shareId, quantity);
  }

  @Post('operations/sell')
  @ApiOperation({ summary: 'Sell a share' })
  @ApiOkResponse({ description: 'The share has been successfully sold.' })
  @ApiNotFoundResponse({ description: 'Portfolio share does not exist' })
  public async sellShare(@Body() request: TradeRequestDto) {
    const { portfolioId, shareId, quantity } = request;
    return this.tradeService.sellShare(portfolioId, shareId, quantity);
  }

  @Get(':tradeId')
  @ApiOperation({ summary: 'Get trade by id' })
  @ApiParam({
    name: 'tradeId',
    description: 'Trade Id',
    example: 1,
  })
  @ApiOkResponse({ description: 'The trade has been successfully retrieved.' })
  @ApiNotFoundResponse({ description: 'The trade does not exist.' })
  public async getTradeById(@Param('tradeId') tradeId) {
    return this.tradeService.getTradeById(tradeId);
  }

  @Get('portfolio/:portfolioId')
  @ApiOperation({ summary: 'Get trades by portfolio id' })
  @ApiParam({
    name: 'portfolioId',
    description: 'Portfolio Id',
    example: 1,
  })
  @ApiOkResponse({
    description: 'The trades have been successfully retrieved.',
  })
  public async getTradesByPortfolioId(@Param('portfolioId') portfolioId) {
    return this.tradeService.getTradesByPortfolioId(portfolioId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get trades by user id' })
  @ApiParam({
    name: 'userId',
    description: 'User Id',
    example: 1,
  })
  @ApiOkResponse({
    description: 'The trades have been successfully retrieved.',
  })
  public async getTradesByUserId(@Param('userId') userId) {
    return this.tradeService.getTradesByUserId(userId);
  }
}
