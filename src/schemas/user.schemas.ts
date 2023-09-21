import Joi from 'joi';
import { ChangePasswordData } from '@/models/user.model';
import { passwordRules } from './auth.schemas';

export const changePasswordSchema = Joi.object<ChangePasswordData>({
  currentPassword: Joi.string().regex(passwordRules).required().messages({
    'string.pattern.base':
      'the password length must be greater than or equal to 8 / must contain one or more uppercase characters / must contain one or more lowercase characters / must contain one or more numeric values / must contain one or more special characters',
  }),
  newPassword: Joi.string().regex(passwordRules).required().messages({
    'string.pattern.base':
      'the password length must be greater than or equal to 8 / must contain one or more uppercase characters / must contain one or more lowercase characters / must contain one or more numeric values / must contain one or more special characters',
  }),
});

export const objectIdSchema = Joi.object({
  userId: Joi.string().hex().length(24),
});
