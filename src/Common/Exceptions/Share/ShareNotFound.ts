import { ERROR_CODES } from '@Eva/Common/Enums/ErrorCodes';
import { HttpException, HttpStatus } from '@nestjs/common';

export class ShareNotFoundException extends HttpException {
  constructor(id: number) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        errorCode: ERROR_CODES.SHARE_NOT_FOUND,
        message: `Share with id ${id} not found`,
      },
      HttpStatus.CONFLICT,
    );
  }
}
