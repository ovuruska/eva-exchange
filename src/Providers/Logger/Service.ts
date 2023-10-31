// logger.service.ts
import { Injectable, Scope } from '@nestjs/common';
import * as winston from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    });
  }

  error(message: string, trace: string) {
    this.logger.error(message, { trace });
  }

  log(message: string) {
    this.logger.info(message);
  }
}
