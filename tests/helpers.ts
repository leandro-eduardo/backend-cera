import UserModel, { CreateUserData } from '@/models/user.model';
import { createUser } from './factories/user.factory';
import jwt from 'jsonwebtoken';
import env from '@/utils/env.config';

export async function clearDatabase() {
  await UserModel.deleteMany({});
}

export async function generateValidToken(user?: CreateUserData & { id?: string }) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, env.JWT_SECRET);

  return token;
}

export async function deleteUser(user: object) {
  await UserModel.deleteOne(user);
}
