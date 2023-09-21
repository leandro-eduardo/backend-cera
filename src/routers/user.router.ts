import { Router } from 'express';
import userController from '@/controllers/user.controller';
import { auth } from '@/middlewares/auth.middleware';
import { schemaValidator } from '@/middlewares/schema-validator.middleware';
import { changePasswordSchema, objectIdSchema } from '@/schemas/user.schemas';

const userRouter = Router();

userRouter.get('/:userId', schemaValidator(objectIdSchema, 'params'), userController.getProfile);
userRouter.patch(
  '/senha/alterar',
  auth,
  schemaValidator(changePasswordSchema, 'body'),
  userController.changePassword
);

export default userRouter;
