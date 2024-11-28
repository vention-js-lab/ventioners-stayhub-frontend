import { z, type ZodType } from 'zod';
import { type AuthFormData } from '#/modules/auth/types';

export const UserLoginSchema: ZodType<Pick<AuthFormData, 'email' | 'password'>> = z.object({
  email: z.string().email({ message: 'Please enter a valid email (e.g. john@stayhub.com)' }),
  password: z.string(),
});
