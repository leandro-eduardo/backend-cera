import { ChangePasswordData } from '@/models/user.model';
import userRepository from '@/repositories/user.repository';
import { checkPassword, generatePasswordHash } from './auth.services';
import { notFoundError, unauthorizedError } from '@/errors';

const getProfile = async (userId: String) => {
  const user = await userRepository.findUserById(userId);
  if (!user) throw notFoundError('user not found');
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

const changePassword = async (userId: string, data: ChangePasswordData) => {
  const existingUser = await userRepository.findUserById(userId);
  if (!existingUser) throw unauthorizedError('invalid credentials');

  const isPasswordCorrect = checkPassword(data.currentPassword, existingUser.password);
  if (!isPasswordCorrect) throw unauthorizedError('invalid credentials');

  const hashedPassword = generatePasswordHash(data.newPassword);
  await userRepository.changePassword(userId, hashedPassword);
};

const findById = async (id: string) => {
  const user = await userRepository.findUserById(id);
  if (!user) throw notFoundError('user not found');

  return user;
};

export default {
  getProfile,
  changePassword,
  findById,
};
