import { CreateUserData, SignInData } from '@/models/user.model';
import userRepository from '@/repositories/user.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '@/utils/env.config';
import { conflictError, unauthorizedError } from '@/errors';

const signIn = async (user: SignInData) => {
  const existingUser = await userRepository.findUserByEmail(user);
  if (!existingUser) throw unauthorizedError('invalid credentials');

  const isPasswordCorrect = checkPassword(user.password, existingUser.password);
  if (!isPasswordCorrect) throw unauthorizedError('invalid credentials');

  const token = await generateToken({ userId: existingUser._id });

  return {
    user: {
      id: existingUser._id,
      email: existingUser.email,
    },
    token,
  };
};

const createUser = async (user: CreateUserData) => {
  const existingUser = await userRepository.findUserByEmail(user);
  if (existingUser) throw conflictError();

  const hashedPassword = generatePasswordHash(user.password);
  await userRepository.createUser({ ...user, password: hashedPassword });
};

export const checkPassword = (passwordReceived: string, userPassword: string) => {
  return bcrypt.compareSync(passwordReceived, userPassword);
};

export const generatePasswordHash = (password: string) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

export const generateToken = async (data: Object) => {
  return jwt.sign(data, env.JWT_SECRET as string, {
    expiresIn: '24h',
  });
};

export default {
  signIn,
  createUser,
};
