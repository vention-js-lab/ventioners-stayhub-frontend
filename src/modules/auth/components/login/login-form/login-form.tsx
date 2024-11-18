import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { axiosInstance } from '#/configs';
import Box from '@mui/material/Box';
import { EmailInput, PasswordInput } from '../components';
import { UserLoginSchema } from '#/zod';
import type { AxiosErrorResponse, LoginFormData } from '#/modules/auth/types';
import { ErrorMessage, GoogleAuthButton, SubmitButton } from '../../shared';
import { randomUUID } from 'crypto';
import { getFirstErrorMessage } from '#/utils';
import { ENDPOINTS } from '#/modules/auth/constants';
import { loginFormStyles as styles } from './login-form.sx';

const maps = [{ Component: EmailInput }, { Component: PasswordInput }];

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({ resolver: zodResolver(UserLoginSchema) });
  const [focusedField, setFocusedField] = useState<'email' | 'password' | null>(null);
  const navigate = useNavigate();

  function handleFocus(field: 'email' | 'password') {
    setFocusedField(field);
  }

  function handleBlur() {
    setFocusedField(null);
  }

  function onSubmit(data: LoginFormData) {
    axiosInstance
      .post(ENDPOINTS.login, data)
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
      <ErrorMessage message={getFirstErrorMessage<LoginFormData>(errors)} />

      <form
        onSubmit={(e) => {
          handleSubmit(onSubmit)(e);
        }}
      >
        <Box sx={styles.wrapper}>
          {maps.map(({ Component }) => (
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
