import { Request, Response } from 'express';
import authServices from '@/services/auth.services';

const signIn = async (req: Request, res: Response) => {
  const signInData = await authServices.signIn(req.body);
  res.send(signInData);
};

const signUp = async (req: Request, res: Response) => {
  const user = await authServices.createUser(req.body);
  res.status(201).send(user);
};

export default {
  signIn,
  signUp,
};
