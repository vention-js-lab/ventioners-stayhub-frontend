import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { axiosInstance } from '#/configs';
import { Box } from '@mui/material';
import { EmailInput, PasswordInput } from '../components';
import { UserLoginSchema } from '#/zod';
import { LoginFormData } from '#/modules/auth/types';
import { ErrorMessage, GoogleAuthButton, SubmitButton } from '../../shared';
import { AccessTokenStore, getFirstErrorMessage } from '#/utils';
import { ENDPOINTS } from '#/modules/auth/constants';
import styles from './login-form.module.css';

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
      .then((res) => res.data)
      .then((res) => {
        AccessTokenStore.setToken(res.data.accessToken);
        navigate(ENDPOINTS.root);
      })
      .catch((err) => {
        setError('email', { message: err.response.data.message });
      });
  }

  return (
    <>
      {errors && <ErrorMessage message={getFirstErrorMessage<LoginFormData>(errors)} />}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={styles.wrapper}>
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

      <Box className={styles.dividerContainer}>
        <Box className={styles.divider}>or</Box>
      </Box>

      <GoogleAuthButton />
    </>
  );
}
