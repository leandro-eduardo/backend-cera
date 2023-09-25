import { Request, Response } from 'express';
import userServices from '@/services/user.services';
import httpStatus from 'http-status';

const getProfile = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await userServices.findById(userId);
  res.send(user);
};

const changePassword = async (req: Request, res: Response) => {
  const { userId: localsUserId } = res.locals;
  const { userId: paramsUserId } = req.params;

  await userServices.changePassword(localsUserId, paramsUserId, req.body);
  res.status(httpStatus.OK).send({ message: 'password changed' });
};

export default {
  getProfile,
  changePassword,
};
