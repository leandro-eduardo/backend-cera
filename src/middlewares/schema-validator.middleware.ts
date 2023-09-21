import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { badRequestError } from '@/errors';

type errors = {
  [key: string]: string;
};

interface CustomRequest extends Request {
  [key: string]: any;
}

export function schemaValidator(schema: ObjectSchema, property: string) {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property], { abortEarly: false });
    if (error) {
      const errors: errors = {};

      for (let item of error.details) {
        errors[item.path[0]] = item.message.replace(/['"]+/g, '');
      }

      throw badRequestError('invalid data was sent', errors);
    }
    next();
  };
}
