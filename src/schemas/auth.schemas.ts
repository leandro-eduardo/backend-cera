import Joi from 'joi';
import { SignUp, SignIn } from '@/types/user.types';

const passwordRules = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
const phoneRules = /(\d{2})(\d{1})(\d{4})(\d{4})/;

export const signInSchema = Joi.object<SignIn>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const signUpSchema = Joi.object<SignUp>({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().regex(passwordRules).required().messages({
    'string.pattern.base':
      'the password length must be greater than or equal to 8 / must contain one or more uppercase characters / must contain one or more lowercase characters / must contain one or more numeric values / must contain one or more special characters',
  }),
  phone: Joi.string().length(11).regex(phoneRules).required().messages({
    'string.pattern.base':
      'the phone number must be in the format of a Brazilian phone, such as: 12912341234',
  }),
});
