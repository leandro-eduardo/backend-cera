import { Request, Response } from 'express';
import userServices from '@/services/user.services';

const getProfile = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await userServices.getProfile(userId);
  res.send(user);
};

const changePassword = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  await userServices.changePassword(userId, req.body);
  res.status(200).send({ message: 'password changed' });
};

export default {
  getProfile,
  changePassword,
};
