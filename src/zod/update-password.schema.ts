import { z, type ZodType } from 'zod';
import { type ProfileFormData } from '#/modules/users/types';

export const UpdatePasswordSchema: ZodType<Partial<ProfileFormData>> = z
  .object({
    oldPassword: z.string(),
    password: z.string().min(8, { message: 'New password is too short' }).max(255, { message: 'New password is too long' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.oldPassword !== data.password, {
    message: 'New password must not be the same as the old password',
    path: ['password'],
  });
