import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { api } from '#/configs';
import Box from '@mui/material/Box';
import { EmailInput, PasswordInput } from '../components';
import { UserLoginSchema } from '#/zod';
import type { AuthFormData, AxiosErrorResponse, FormDataKeys } from '#/modules/auth/types';
import { AuthRedirectButton, ErrorMessage, GoogleAuthButton, SubmitButton } from '../../shared';
import { getFirstErrorMessage } from '#/utils';
import { ENDPOINTS, ROUTES } from '#/modules/auth/constants';
import { loginFormStyles as styles } from './login-form.styles';

const maps = [{ Component: EmailInput }, { Component: PasswordInput }];

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AuthFormData>({ resolver: zodResolver(UserLoginSchema) });
  const [focusedField, setFocusedField] = useState<FormDataKeys | null>(null);
  const navigate = useNavigate();

  function handleFocus(field: FormDataKeys) {
    setFocusedField(field);
  }

  function handleBlur() {
    setFocusedField(null);
  }

  function onSubmit(data: AuthFormData) {
    api
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
      <ErrorMessage message={getFirstErrorMessage<AuthFormData>(errors)} />

      <form
        onSubmit={(e) => {
          handleSubmit(onSubmit)(e);
        }}
      >
        <Box sx={styles.wrapper}>
          {maps.map(({ Component }, idx) => (
            <Component
              key={idx}
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

      <AuthRedirectButton link={ROUTES.signup} message="Create an account" />
    </>
  );
}
