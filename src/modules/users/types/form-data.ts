import type { UseFormRegister } from 'react-hook-form';

export type PersonalInfoFormData = {
  firstName: User['firstName'];
  lastName: User['lastName'];
  email: User['email'];
};

export type FormDataKeys = keyof PersonalInfoFormData;

export type FormInputProps = {
  focusedField: FormDataKeys | null;
  handleBlur: () => void;
  handleFocus: (field: FormDataKeys) => void;
  register: UseFormRegister<PersonalInfoFormData>;
};

export type AxiosErrorResponse = {
  message: string;
};
