import { Request, Response, NextFunction } from 'express';
import { AppError, errorTypeToStatusCode, isAppError } from '@/errors';

export default function errorsHandler(error: AppError, req: Request, res: Response, next: NextFunction) {
  if (isAppError(error)) {
    const statusCode = errorTypeToStatusCode(error.type);
    return res
      .status(statusCode)
      .send({ type: error.type, statusCode, message: error.message, details: error.details });
  }
  res.sendStatus(500);
}
