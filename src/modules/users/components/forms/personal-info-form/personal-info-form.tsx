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
import { PersonalInfoSchema } from '#/zod';
import { ENDPOINTS, ROUTES } from '#/modules/users/constants';
import { api } from '#/configs';
import { ErrorMessage } from '#/modules/users/components';
import { getFirstErrorMessage, omit } from '#/utils';
import { EmailInput, FirstNameInput, LastNameInput } from '../../input-fields';
import { useAppDispatch, useAppSelector } from '#/redux/hooks';
import { HeaderComponent } from '#/modules/home/components/header';
import { personalInfoFormStyles as styles } from './personal-info-form.styles';
import { toast } from 'react-toastify';
import { createUser } from '#/redux/auth/auth-slice';
import { type User } from '#/types';
import { useQueryClient } from '@tanstack/react-query';

export function PersonalInfoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ProfileFormData>({ resolver: zodResolver(PersonalInfoSchema) });
  const [focusedField, setFocusedField] = useState<FormDataKeys | null>('lastName');
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  function handleClick() {
    navigate(ROUTES.accountSettings);
  }

  function handleFocus(field: FormDataKeys) {
    setFocusedField(field);
  }

  function handleBlur() {
    setFocusedField(null);
  }

  function onSubmit(data: ProfileFormData) {
    api
      .put(`${ENDPOINTS.users}/${user?.id}`, data)
      .then((res) => {
        const updatedUser = omit(res.data, ['createdAt', 'updatedAt', 'passwordHash']) as User;

        queryClient.invalidateQueries({ queryKey: ['auth-user'] });
        dispatch(createUser(updatedUser));
        toast('Success');

        navigate(-1);
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
          <Link underline="hover" key="1" onClick={handleClick} sx={styles.breadcrumbs}>
            Account
          </Link>
          <Typography key="2" sx={styles.breadcrumbs}>
            Personal info
          </Typography>
        </Breadcrumbs>

        <Typography sx={styles.heading}>Personal info</Typography>

        <ErrorMessage message={getFirstErrorMessage<ProfileFormData>(errors)} />

        <form
          onSubmit={(e) => {
            handleSubmit(onSubmit)(e);
          }}
        >
          <Box sx={styles.nameContainer}>
            <Typography sx={styles.label}>Legal Name</Typography>
            <Box sx={styles.nameInput}>
              <FirstNameInput
                register={register}
                focusedField={focusedField}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                content={user?.firstName}
              />
              <LastNameInput
                register={register}
                focusedField={focusedField}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                content={user?.lastName}
              />
            </Box>
          </Box>

          <Typography sx={styles.label}>Email</Typography>
          <EmailInput
            register={register}
            focusedField={focusedField}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            content={user?.email}
          />

          <Button type="submit" disableRipple={true} sx={styles.button}>
            Save
          </Button>
        </form>
      </Box>
    </Fragment>
  );
}
