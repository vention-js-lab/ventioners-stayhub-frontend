import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { axiosInstance } from '#/configs';
import { Box } from '@mui/material';
import { EmailInput, PasswordInput, FirstNameInput, LastNameInput, ConfirmPasswordInput } from '../components';
import { UserSignupSchema } from '#/zod';
import { SignupFormData, SignupFormDataKeys } from '#/modules/auth/types';
import { ErrorMessage, GoogleAuthButton, SubmitButton } from '../../shared';
import { AccessTokenStore, getFirstErrorMessage } from '#/utils';
import { ENDPOINTS } from '#/modules/auth/constants';
import styles from './signup-form.module.css';

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
      {errors && <ErrorMessage message={getFirstErrorMessage<SignupFormData>(errors)} />}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={styles.wrapper}>
          {maps.slice(0, 2).map(({ Component }, idx) => (
            <Component
              key={idx}
              register={register}
              focusedField={focusedField}
              handleFocus={handleFocus}
              handleBlur={handleBlur}
            />
          ))}
        </Box>

        <Box className={styles.wrapper}>
          {maps.slice(2).map(({ Component }, idx) => (
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
