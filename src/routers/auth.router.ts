import { Router } from 'express';
import authController from '@/controllers/auth.controller';
import { schemaValidator } from '@/middlewares/schema-validator.middleware';
import { signInSchema, signUpSchema } from '@/schemas/auth.schemas';

const authRouter = Router();

authRouter.post('/entrar', schemaValidator(signInSchema, 'body'), authController.signIn);
authRouter.post('/registrar', schemaValidator(signUpSchema, 'body'), authController.signUp);

export default authRouter;
