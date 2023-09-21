import { ChangePasswordData } from '@/models/user.model';
import userRepository from '@/repositories/user.repository';
import { checkPassword, generatePasswordHash } from './auth.services';
import { notFoundError, unauthorizedError } from '@/errors';

const findById = async (id: string) => {
  const user = await userRepository.findUserById(id);
  if (!user) throw notFoundError('user not found');

  return user;
};

const changePassword = async (userId: string, data: ChangePasswordData) => {
  const existingUser = await findById(userId);

  const isPasswordCorrect = checkPassword(data.currentPassword, existingUser.password);
  if (!isPasswordCorrect) throw unauthorizedError('the password is incorrect');

  const hashedPassword = generatePasswordHash(data.newPassword);
  await userRepository.changePassword(userId, hashedPassword);
};

export default {
  changePassword,
  findById,
};
