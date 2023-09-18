import { CreateUserData, SignInData } from '../models/user.model';
import UserModel from '@/models/user.model';

const createUser = async (user: CreateUserData) => {
  return UserModel.create(user);
};

const findUserById = async (id: String) => {
  return UserModel.findById(id);
};

const findUserByEmail = async (user: SignInData) => {
  return UserModel.findOne({ email: user.email });
};

const changePassword = async (userId: string, password: string) => {
  return UserModel.updateOne({ _id: userId }, { $set: { password } });
};

export default {
  createUser,
  findUserById,
  findUserByEmail,
  changePassword,
};
