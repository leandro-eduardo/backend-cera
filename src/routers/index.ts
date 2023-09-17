import { Router } from 'express';
import authRouter from './auth-router';
import userRouter from './user-router';

const router = Router();

router.use('/autenticacao', authRouter);
router.use('/perfil', userRouter);

export default router;
