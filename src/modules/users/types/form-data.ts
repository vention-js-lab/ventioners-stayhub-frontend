import { type User } from '#/types';
import type { UseFormRegister } from 'react-hook-form';

export type ProfileFormData = {
  firstName: User['firstName'];
  lastName: User['lastName'];
  email: User['email'];
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

export type FormDataKeys = keyof ProfileFormData;

export type FormInputProps = {
  focusedField: FormDataKeys | null;
  handleBlur: () => void;
  handleFocus: (field: FormDataKeys) => void;
  register: UseFormRegister<ProfileFormData>;
  content?: string;
};

export type AxiosErrorResponse = {
  message: string;
};
