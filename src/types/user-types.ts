export type SignIn = Pick<SignUp, 'email' | 'password'>;

export type SignUp = {
  name: string;
  email: string;
  password: string;
  phone: string;
};
