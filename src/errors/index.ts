type AppErrorTypes = 'conflict' | 'not_found' | 'bad_request' | 'unauthorized';

export interface AppError {
  type: AppErrorTypes;
  message?: string;
  details?: string | Object;
}

export function isAppError(error: object): error is AppError {
  return (error as AppError).type !== undefined;
}

export function errorTypeToStatusCode(type: AppErrorTypes) {
  const errorTypes = {
    conflict: 409,
    not_found: 404,
    bad_request: 400,
    unauthorized: 401,
  };

  return errorTypes[type];
}

export function conflictError(message?: string): AppError {
  return { type: 'conflict', message };
}

export function notFoundError(message: string): AppError {
  return { type: 'not_found', message };
}

export function badRequestError(message: string, details?: Object): AppError {
  return { type: 'bad_request', message, details };
}

export function unauthorizedError(message: string): AppError {
  return { type: 'unauthorized', message };
}
