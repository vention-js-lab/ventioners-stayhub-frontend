import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '#/configs';
import { AxiosError } from 'axios';
import Box from '@mui/material/Box';
import { EmailInput, PasswordInput, FirstNameInput, LastNameInput, ConfirmPasswordInput } from '../components';
import { UserSignupSchema } from '#/zod';
import type { AuthFormData, AxiosErrorResponse, FormDataKeys } from '#/modules/auth/types';
import { AuthRedirectButton, ErrorMessage, GoogleAuthButton, SubmitButton } from '../../shared';
import { getFirstErrorMessage } from '#/utils';
import { ENDPOINTS, ROUTES } from '#/modules/auth/constants';
import { signupFormStyles as styles } from './signup-form.styles';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';
import { useTranslation } from 'react-i18next';

const maps = [
  { Component: FirstNameInput },
  { Component: LastNameInput },
  { Component: EmailInput },
  { Component: PasswordInput },
  { Component: ConfirmPasswordInput },
];

export function SignupForm() {
  const { t } = useTranslation('auth');
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AuthFormData>({ resolver: zodResolver(UserSignupSchema) });

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
      <ErrorMessage message={getFirstErrorMessage<AuthFormData>(errors)} />

      <form
        onSubmit={(e) => {
          handleSubmit(onSubmit)(e);
        }}
      >
        <Box sx={styles.wrapper}>
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

        <Box sx={styles.wrapper}>
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

      <Box sx={styles.dividerContainer}>
        <Box sx={styles.divider}>{t(TRANSLATION_KEYS.auth.or)}</Box>
      </Box>

      <GoogleAuthButton />

      <AuthRedirectButton link={ROUTES.login} message={t(TRANSLATION_KEYS.auth.login_to_your_account)} />
    </>
  );
}
