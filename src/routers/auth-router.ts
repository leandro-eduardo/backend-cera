import { Router } from 'express';
import * as authController from '@/controllers/auth-controller';

const authRouter = Router();

authRouter.post('/entrar', authController.signIn);
authRouter.post('/registrar', authController.signUp);

export default authRouter;
