import { Request, Response } from 'express';
import authServices from '@/services/auth.services';

const signIn = async (req: Request, res: Response) => {
  try {
    const token = await authServices.signIn(req.body);
    res.send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const signUp = async (req: Request, res: Response) => {
  try {
    await authServices.createUser(req.body);
    res.status(201).send({ message: 'user created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export default {
  signIn,
  signUp,
};
