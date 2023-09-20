import mongoose, { InferSchemaType } from 'mongoose';
import { emailRules, phoneRules } from '@/schemas/auth.schemas';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minLength: 3 },
    email: { type: String, unique: true, required: true, match: emailRules },
    password: { type: String, required: true },
    phone: { type: String, required: true, minLength: 11, maxLength: 11, match: phoneRules },
  },
  { timestamps: true, versionKey: false }
);

export type CreateUserData = InferSchemaType<typeof userSchema>;
export type SignInData = Pick<CreateUserData, 'email' | 'password'>;
export type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.password;
  const { id, name, email, phone, createdAt, updatedAt } = obj;
  return { id, name, email, phone, createdAt, updatedAt };
};

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
