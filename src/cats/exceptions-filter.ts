import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Response } from 'express';

import {
  CatAlreadyExistException,
  MaxFetchReachedException,
} from './core/model/exceptions';
@Catch(Error)
export class ExceptionsFilter<T extends Error | HttpException>
  implements ExceptionFilter
{
  private static formatHttpException(
    httpException: HttpException,
    message: string,
  ) {
    return {
      code: httpException.getStatus(),
      message: httpException.message,
      description: message,
      timestamp: new Date().toISOString(),
    };
  }

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const error = this.generateErrorJson(exception);
    response.status(error.code).json(error);
  }

  private generateErrorJson(exception: T) {
    if (exception instanceof HttpException)
      return ExceptionsFilter.formatHttpException(
        exception,
        (exception.getResponse() as Record<string, string>).message[0],
      );
    else {
      switch (exception.constructor) {
        case MaxFetchReachedException:
          Logger.warn(`caught http exception ${exception.message}`);
          return ExceptionsFilter.formatHttpException(
            new UnprocessableEntityException(),
            exception.message,
          );
        case CatAlreadyExistException:
          Logger.log(`caught http exception ${exception.message}`);
          return ExceptionsFilter.formatHttpException(
            new ConflictException(),
            exception.message,
          );
        default:
          Logger.error(`caught unhandled exception ${exception.message}`);
          return ExceptionsFilter.formatHttpException(
            new InternalServerErrorException(),
            exception.message,
          );
      }
    }
  }
}
