import { Request, Response, NextFunction } from 'express';
import userServices from '@/services/user.services';
import jwt from 'jsonwebtoken';
import env from '@/utils/env.config';
import { JwtPayload } from 'jsonwebtoken';
import { unauthorizedError } from '@/errors';

type Payload = {
  userId: string;
} & JwtPayload;

function getJsonWebTokenSecret() {
  const JWT_SECRET = env.JWT_SECRET;

  if (!JWT_SECRET || JWT_SECRET.length === 0) {
    throw new Error('Missing JWT_SECRET');
  }

  return JWT_SECRET;
}

export async function auth(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) throw unauthorizedError('missing authorization header');

  const tokenParts = authorization.split(' ');

  const [, token] = tokenParts;

  const payload = jwt.verify(token, getJsonWebTokenSecret()) as Payload;
  const user = await userServices.findById(payload.userId);
  res.locals.userId = user._id;
  next();
}
