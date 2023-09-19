import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { CreateUserData } from '@/models/user.model';
import UserModel from '@/models/user.model';

export async function createUser(params: Partial<CreateUserData>): Promise<CreateUserData & { id?: string }> {
  const incomingPassword = params.password || faker.internet.password();
  const hashedPassword = await bcrypt.hash(incomingPassword, bcrypt.genSaltSync());

  return UserModel.create({
    name: faker.person.fullName(),
    email: params.email || faker.internet.email(),
    password: hashedPassword,
    phone: faker.phone.number('##9########'),
  });
}
