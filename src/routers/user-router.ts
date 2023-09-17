import { Router } from 'express';
import * as userController from '../controllers/user-controller';

const userRouter = Router();

userRouter.get('/:userId', userController.getProfile);
userRouter.patch('/senha/alterar', userController.changePassword);

export default userRouter;
