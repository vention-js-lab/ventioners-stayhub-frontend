import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Fragment } from 'react/jsx-runtime';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { type ProfileFormData, type FormDataKeys, type AxiosErrorResponse } from '#/modules/users/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { ROUTES } from '#/modules/users/constants';
import { ENDPOINTS as AUTH_ENDPOINTS } from '#/modules/auth/constants';
import { api } from '#/configs';
import { DeleteAccountModal, ErrorMessage } from '#/modules/users/components';
import { getFirstErrorMessage } from '#/utils';
import { ConfirmPasswordInput, OldPasswordInput, PasswordInput } from '#/modules/users/components/input-fields';
import { HeaderComponent } from '#/modules/home/components/header';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { UpdatePasswordSchema } from '#/zod';
import { securityFormStyles as styles } from './security-form.styles';

export function SecurityForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ProfileFormData>({ resolver: zodResolver(UpdatePasswordSchema) });
  const [focusedField, setFocusedField] = useState<FormDataKeys | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function redirectToSettings() {
    navigate(ROUTES.accountSettings);
  }

  function handleFocus(field: FormDataKeys) {
    setFocusedField(field);
  }

  function handleBlur() {
    setFocusedField(null);
  }

  function handleUpdateUserPassword(data: ProfileFormData) {
    api
      .post(`${AUTH_ENDPOINTS.updatePassword}`, { oldPassword: data.oldPassword, newPassword: data.password })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['auth-user'] });
        toast('Success');

        navigate(ROUTES.root);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          const errorData = err.response?.data as AxiosErrorResponse;
          setError('firstName', { message: errorData.message });
        } else {
          setError('firstName', { message: 'Something went wrong' });
        }
      });
  }

  return (
    <Fragment>
      <HeaderComponent />

      <Box sx={styles.container}>
        <Breadcrumbs separator=">">
          <Link underline="hover" key="1" onClick={redirectToSettings} sx={styles.breadcrumbs}>
            Account
          </Link>
          <Typography key="2" sx={styles.breadcrumbs}>
            Login & security
          </Typography>
        </Breadcrumbs>

        <Typography sx={styles.heading}>Login & security</Typography>

        <ErrorMessage message={getFirstErrorMessage<ProfileFormData>(errors)} />

        <form
          onSubmit={(e) => {
            handleSubmit(handleUpdateUserPassword)(e);
          }}
        >
          <Typography sx={styles.label}>Update Your Password</Typography>
          <Box sx={styles.inputContainer}>
            <OldPasswordInput register={register} focusedField={focusedField} handleFocus={handleFocus} handleBlur={handleBlur} />
            <PasswordInput register={register} focusedField={focusedField} handleFocus={handleFocus} handleBlur={handleBlur} />
            <ConfirmPasswordInput
              register={register}
              focusedField={focusedField}
              handleFocus={handleFocus}
              handleBlur={handleBlur}
            />
          </Box>

          <Button type="submit" disableRipple={true} sx={styles.button}>
            Save
          </Button>
        </form>

        <Box sx={styles.deleteAccountContainer}>
          <Typography sx={styles.label}>Deactivate your account</Typography>

          <DeleteAccountModal />
        </Box>
      </Box>
    </Fragment>
  );
}
