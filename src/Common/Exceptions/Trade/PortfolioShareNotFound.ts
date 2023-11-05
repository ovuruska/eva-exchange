import { ERROR_CODES } from '@Eva/Common/Enums/ErrorCodes';
import { HttpException, HttpStatus } from '@nestjs/common';

export class PortfolioShareNotFoundException extends HttpException {
  constructor(portfolioId: number, shareId: number) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        errorCode: ERROR_CODES.PORTFOLIO_SHARE_NOT_FOUND,
        message: `Portfolio share with portfolio id ${portfolioId} and share id ${shareId} not found.`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
