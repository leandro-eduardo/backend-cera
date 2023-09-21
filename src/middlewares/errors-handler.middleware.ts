import { Request, Response, NextFunction } from 'express';
import { AppError, errorTypeToStatusCode, isAppError } from '@/errors';
import { JsonWebTokenError } from 'jsonwebtoken';

export default function errorsHandler(error: AppError, req: Request, res: Response, next: NextFunction) {
  if (error instanceof JsonWebTokenError) {
    return res.status(401).send({
      type: 'unauthorized',
      statusCode: 401,
      message: error.message,
    });
  }

  if (isAppError(error)) {
    const statusCode = errorTypeToStatusCode(error.type);
    return res
      .status(statusCode)
      .send({ type: error.type, statusCode, message: error.message, details: error.details });
  }
  res.sendStatus(500);
}
