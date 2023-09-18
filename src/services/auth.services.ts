import { CreateUserData, SignInData } from '@/models/user.model';
import userRepository from '@/repositories/user.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signIn = async (user: SignInData) => {
  const existingUser = await userRepository.findUserByEmail(user);
  if (!existingUser) throw Error('Invalid credentials');

  const isPasswordCorrect = bcrypt.compareSync(user.password, existingUser.password);
  if (!isPasswordCorrect) throw Error('Invalid credentials');

  const JWT_SECRET = process.env.JWT_SECRET as string;
  const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, {
    expiresIn: '24h',
  });

  return token;
};

const createUser = async (user: CreateUserData) => {
  const existingUser = await userRepository.findUserByEmail(user);
  if (existingUser) throw Error('User is already registered');

  const SALT = 10;
  const hashedPassword = bcrypt.hashSync(user.password, SALT);
  await userRepository.createUser({ ...user, password: hashedPassword });
};

export default {
  signIn,
  createUser,
};
