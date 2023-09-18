import { ChangePasswordData } from '@/models/user.model';
import userRepository from '@/repositories/user.repository';
import bcrypt from 'bcrypt';

const getProfile = async (userId: String) => {
  const user = await userRepository.findUserById(userId);
  if (!user) throw Error('User not found');
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
  if (!existingUser) throw Error('Invalid credentials');

  const isPasswordCorrect = bcrypt.compareSync(data.currentPassword, existingUser.password);
  if (!isPasswordCorrect) throw Error('Invalid credentials');

  const SALT = 10;
  const hashedPassword = bcrypt.hashSync(data.newPassword, SALT);
  await userRepository.changePassword(userId, hashedPassword);
};

const findById = async (id: string) => {
  const user = await userRepository.findUserById(id);
  if (!user) throw Error('User not found');

  return user;
};

export default {
  getProfile,
  changePassword,
  findById,
};
