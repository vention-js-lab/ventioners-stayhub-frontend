import type { User } from '#/interfaces';
import type { UseFormRegister } from 'react-hook-form';

export type AuthFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type FormDataKeys = keyof AuthFormData;

export type FormInputProps = {
  focusedField: FormDataKeys | null;
  handleBlur: () => void;
  handleFocus: (field: FormDataKeys) => void;
  register: UseFormRegister<AuthFormData>;
};

export type AxiosErrorResponse = {
  message: string;
};

export type AxiosAuthResponse = {
  user: User;
};
