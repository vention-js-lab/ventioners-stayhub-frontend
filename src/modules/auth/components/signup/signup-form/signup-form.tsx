import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { axiosInstance } from '#/configs';
import { AxiosError } from 'axios';
import { randomUUID } from 'crypto';
import Box from '@mui/material/Box';
import { EmailInput, PasswordInput, FirstNameInput, LastNameInput, ConfirmPasswordInput } from '../components';
import { UserSignupSchema } from '#/zod';
import type { AxiosErrorResponse, SignupFormData, SignupFormDataKeys } from '#/modules/auth/types';
import { ErrorMessage, GoogleAuthButton, SubmitButton } from '../../shared';
import { getFirstErrorMessage } from '#/utils';
import { ENDPOINTS } from '#/modules/auth/constants';
import { signupFormStyles as styles } from './signup-form.sx';

const maps = [
  { Component: FirstNameInput },
  { Component: LastNameInput },
  { Component: EmailInput },
  { Component: PasswordInput },
  { Component: ConfirmPasswordInput },
];

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupFormData>({ resolver: zodResolver(UserSignupSchema) });

  const [focusedField, setFocusedField] = useState<SignupFormDataKeys | 'cpassword' | null>(null);
  const navigate = useNavigate();

  function handleFocus(field: SignupFormDataKeys | 'cpassword') {
    setFocusedField(field);
  }

  function handleBlur() {
    setFocusedField(null);
  }

  function onSubmit(data: SignupFormData) {
    axiosInstance
      .post(ENDPOINTS.signup, data)
      .then(() => navigate(ENDPOINTS.root))
      .catch((err) => {
        if (err instanceof AxiosError) {
          const errorData = err.response?.data as AxiosErrorResponse;
          setError('email', { message: errorData.message });
        } else {
          setError('email', { message: 'Something went wrong' });
        }
      });
  }

  return (
    <>
      <ErrorMessage message={getFirstErrorMessage<SignupFormData>(errors)} />

      <form
        onSubmit={(e) => {
          handleSubmit(onSubmit)(e);
        }}
      >
        <Box sx={styles.wrapper}>
          {maps.slice(0, 2).map(({ Component }) => (
            <Component
              key={randomUUID()}
              register={register}
              focusedField={focusedField}
              handleFocus={handleFocus}
              handleBlur={handleBlur}
            />
          ))}
        </Box>

        <Box sx={styles.wrapper}>
          {maps.slice(2).map(({ Component }) => (
            <Component
              key={randomUUID()}
              register={register}
              focusedField={focusedField}
              handleFocus={handleFocus}
              handleBlur={handleBlur}
            />
          ))}
        </Box>

        <SubmitButton />
      </form>

      <Box sx={styles.dividerContainer}>
        <Box sx={styles.divider}>or</Box>
      </Box>

      <GoogleAuthButton />
    </>
  );
}
