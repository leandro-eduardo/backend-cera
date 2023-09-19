import UserModel from '@/models/user.model';

export async function cleanDatabase() {
  await UserModel.deleteMany({});
}
