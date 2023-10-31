import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_CODES } from '@Eva/Common/Enums/ErrorCodes';

export class UserNotFoundException extends HttpException {
  constructor(id: number) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        errorCode: ERROR_CODES.USER_NOT_FOUND,
        message: `User with id ${id} not found`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
