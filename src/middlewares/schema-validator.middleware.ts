import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

type errors = {
  [key: string]: string;
};

export function schemaValidator(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors: errors = {};

      for (let item of error.details) {
        errors[item.path[0]] = item.message.replace(/['"]+/g, '');
      }
      return res.status(422).send({ type: 'wrong_schema', statusCode: 422, message: errors });
    }
    next();
  };
}
