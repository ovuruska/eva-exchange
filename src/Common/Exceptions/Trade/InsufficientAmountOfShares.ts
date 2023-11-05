import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_CODES } from '@Eva/Common/Enums/ErrorCodes';

export class InsufficientAmountOfShares extends HttpException {
  constructor(portfolioId: number, shareId: number, quantity: number) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: ERROR_CODES.INSUFFICIENT_AMOUNT_OF_SHARES,
        message: `Portfolio share with portfolio id ${portfolioId} and share id ${shareId} has insufficient amount of shares. Current amount is ${quantity}.`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
