import { Request, Response } from 'express';
import authServices from '@/services/auth.services';
import httpStatus from 'http-status';

const signIn = async (req: Request, res: Response) => {
  const signInData = await authServices.signIn(req.body);
  res.send(signInData);
};

const signUp = async (req: Request, res: Response) => {
  const user = await authServices.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
};

export default {
  signIn,
  signUp,
};
