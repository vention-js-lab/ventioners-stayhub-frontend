import { UseFormRegister } from 'react-hook-form';

export type SignupFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type SignupFormDataKeys = keyof Omit<SignupFormData, 'confirmPassword'>;

export type SignupInputProps = {
  focusedField: SignupFormDataKeys | 'cpassword' | null;
  handleBlur: () => void;
  handleFocus: (field: SignupFormDataKeys | 'cpassword') => void;
  register: UseFormRegister<SignupFormData>;
};

export type LoginInputProps = {
  focusedField: 'email' | 'password' | null;
  handleBlur: () => void;
  handleFocus: (field: 'email' | 'password') => void;
  register: UseFormRegister<LoginFormData>;
};
