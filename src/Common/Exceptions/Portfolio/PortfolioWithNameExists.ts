import { ERROR_CODES } from '@Eva/Common/Enums/ErrorCodes';
import { HttpException, HttpStatus } from '@nestjs/common';

export class PortfolioWithNameExistsException extends HttpException {
  constructor(name: string) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        errorCode: ERROR_CODES.PORTFOLIO_WITH_NAME_EXISTS,
        message: `Portfolio with name ${name} already exists`,
      },
      HttpStatus.CONFLICT,
    );
  }
}
