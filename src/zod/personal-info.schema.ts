import { z, type ZodType } from 'zod';
import { type ProfileFormData } from '#/modules/users/types';

export const PersonalInfoSchema: ZodType<Partial<ProfileFormData>> = z.object({
  firstName: z
    .string()
    .min(1, { message: 'Please enter a valid first name' })
    .max(255, { message: 'Entered first name is too long' }),
  lastName: z
    .string()
    .min(1, { message: 'Please enter a valid last name' })
    .max(255, { message: 'Entered last name is too long' }),
  email: z.string().email({ message: 'Please enter a valid email (e.g. john@stayhub.com)' }),
});
