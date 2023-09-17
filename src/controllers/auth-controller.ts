import { Request, Response } from 'express';

export const signIn = async (req: Request, res: Response) => {
  console.log(req.body);
  res.send(`${req.originalUrl} OK`);
};

export const signUp = async (req: Request, res: Response) => {
  console.log(req.body);
  res.send(`${req.originalUrl} OK`);
};
