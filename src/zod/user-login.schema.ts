import { z, ZodType } from 'zod';
import { LoginFormData } from '#/modules/auth/types';

export const UserLoginSchema: ZodType<LoginFormData> = z.object({
  email: z.string().email({ message: 'Please enter a valid email (e.g. john@stayhub.com)' }),
  password: z.string().min(8, { message: 'Entered password is too short' }).max(64, { message: 'Entered password is too long' }),
});
