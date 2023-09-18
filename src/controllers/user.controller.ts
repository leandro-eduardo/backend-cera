import { Request, Response } from 'express';
import userServices from '@/services/user.services';

const getProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await userServices.getProfile(userId);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const changePassword = async (req: Request, res: Response) => {
  try {
    const { userId } = res.locals;
    await userServices.changePassword(userId, req.body);
    res.status(200).send({ message: 'password changed' });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export default {
  getProfile,
  changePassword,
};
