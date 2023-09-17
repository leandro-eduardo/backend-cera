import { Request, Response } from 'express';

export const getProfile = async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(`userId: ${userId}`);
  res.send(`${req.originalUrl} OK`);
};

export const changePassword = async (req: Request, res: Response) => {
  res.send(`${req.originalUrl} OK`);
};
