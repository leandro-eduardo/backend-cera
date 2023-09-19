import { Router } from 'express';
import userController from '@/controllers/user.controller';
import { auth } from '@/middlewares/auth.middleware';
import { schemaValidator } from '@/middlewares/schema-validator.middleware';
import { changePasswordSchema } from '@/schemas/user.schemas';

const userRouter = Router();

userRouter.get('/:userId', userController.getProfile);
userRouter.patch(
  '/senha/alterar',
  auth,
  schemaValidator(changePasswordSchema),
  userController.changePassword
);

export default userRouter;
