import { Router } from 'express';
import userController from '@/controllers/user.controller';
import { auth } from '@/middlewares/auth.middleware';

const userRouter = Router();

userRouter.get('/:userId', userController.getProfile);
userRouter.patch('/senha/alterar', auth, userController.changePassword);

export default userRouter;
