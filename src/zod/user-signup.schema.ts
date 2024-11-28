import { z, type ZodType } from 'zod';
import { type AuthFormData } from '#/modules/auth/types';

export const UserSignupSchema: ZodType<AuthFormData> = z
  .object({
    firstName: z
      .string()
      .min(1, { message: 'Please enter your first name' })
      .max(255, { message: 'Entered first name is too long' }),
    lastName: z
      .string()
      .min(1, { message: 'Please enter your last name' })
      .max(255, { message: 'Entered last name is too long' }),
    email: z.string().email({ message: 'Please enter a valid email (e.g. john@stayhub.com)' }),
    password: z
      .string()
      .min(8, { message: 'Entered password is too short' })
      .max(64, { message: 'Entered password is too long' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
