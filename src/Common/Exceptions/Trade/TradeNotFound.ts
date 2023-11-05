import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_CODES } from '@Eva/Common/Enums/ErrorCodes';

export class TradeNotFoundException extends HttpException {
  constructor(tradeId: number) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        errorCode: ERROR_CODES.TRADE_NOT_FOUND,
        message: `Trade with id ${tradeId} not found.`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
