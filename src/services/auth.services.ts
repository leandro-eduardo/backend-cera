import { CreateUserData, SignInData } from '@/models/user.model';
import userRepository from '@/repositories/user.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '@/utils/env.config';

const signIn = async (user: SignInData) => {
  const existingUser = await userRepository.findUserByEmail(user);
  if (!existingUser) throw Error('Invalid credentials');

  const isPasswordCorrect = checkPassword(user.password, existingUser.password);
  if (!isPasswordCorrect) throw Error('Invalid credentials');

  const token = await generateToken({ userId: existingUser._id });

  return token;
};

const createUser = async (user: CreateUserData) => {
  const existingUser = await userRepository.findUserByEmail(user);
  if (existingUser) throw Error('User is already registered');

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
