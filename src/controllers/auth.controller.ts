import { Request, Response } from 'express';
import authServices from '@/services/auth.services';

const signIn = async (req: Request, res: Response) => {
  const signInData = await authServices.signIn(req.body);
  res.send(signInData);
};

const signUp = async (req: Request, res: Response) => {
  await authServices.createUser(req.body);
  res.status(201).send({ message: 'user created successfully' });
};

export default {
  signIn,
  signUp,
};
