import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppError } from '../exceptions/app.error';

interface ErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  code?: string;
  errors?: unknown;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResponse = this.buildErrorResponse(exception, request);

    this.logger.error(
      `${request.method} ${request.url} - ${errorResponse.statusCode}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    response.status(errorResponse.statusCode).json(errorResponse);
  }

  private buildErrorResponse(
    exception: unknown,
    request: Request,
  ): ErrorResponse {
    const timestamp = new Date().toISOString();
    const path = request.url;

    if (exception instanceof AppError) {
      return {
        statusCode: exception.statusCode,
        timestamp,
        path,
        message: exception.message,
        code: exception.code,
      };
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      return {
        statusCode: status,
        timestamp,
        path,
        message:
          typeof exceptionResponse === 'string'
            ? exceptionResponse
            : (exceptionResponse as { message?: string }).message ||
              'An error occurred',
        errors:
          typeof exceptionResponse === 'object'
            ? (exceptionResponse as { errors?: unknown }).errors
            : undefined,
      };
    }

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp,
      path,
      message:
        exception instanceof Error
          ? exception.message
          : 'Internal server error',
    };
  }
}
