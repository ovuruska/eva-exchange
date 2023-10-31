import { ERROR_CODES } from '@Eva/Common/Enums/ErrorCodes';
import { HttpException, HttpStatus } from '@nestjs/common';

export class ShareWithSymbolExistsException extends HttpException {
  constructor(symbol: string) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        errorCode: ERROR_CODES.SHARE_WITH_SYMBOL_EXISTS,
        message: `Share with symbol ${symbol} already exists`,
      },
      HttpStatus.CONFLICT,
    );
  }
}
