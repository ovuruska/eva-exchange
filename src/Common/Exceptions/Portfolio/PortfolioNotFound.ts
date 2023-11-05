import { ERROR_CODES } from '@Eva/Common/Enums/ErrorCodes';
import { HttpException, HttpStatus } from '@nestjs/common';

export class PortfolioNotFoundException extends HttpException {
  constructor(id: number) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        errorCode: ERROR_CODES.PORTFOLIO_NOT_FOUND,
        message: `Portfolio with id ${id} not found.`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
