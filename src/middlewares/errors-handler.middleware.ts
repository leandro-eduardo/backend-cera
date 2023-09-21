import { Request, Response, NextFunction } from 'express';
import { AppError, errorTypeToStatusCode, isAppError } from '@/errors';
import { JsonWebTokenError } from 'jsonwebtoken';
import httpStatus from 'http-status';

export default function errorsHandler(error: AppError, req: Request, res: Response, next: NextFunction) {
  if (error instanceof JsonWebTokenError) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      type: 'unauthorized',
      statusCode: httpStatus.UNAUTHORIZED,
      message: error.message,
    });
  }

  if (isAppError(error)) {
    const statusCode = errorTypeToStatusCode(error.type);
    return res
      .status(statusCode)
      .send({ type: error.type, statusCode, message: error.message, details: error.details });
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    type: 'server_error',
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    message: error,
  });
}
