import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Fragment } from 'react/jsx-runtime';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { type ProfileFormData, type FormDataKeys } from '#/modules/users/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalInfoSchema } from '#/zod';
import { ROUTES } from '#/modules/users/constants';
import { ErrorMessage } from '#/modules/users/components';
import { getFirstErrorMessage } from '#/utils';
import { EmailInput, FirstNameInput, LastNameInput } from '#/modules/users/components/input-fields';
import { useAppSelector } from '#/redux/hooks';
import { HeaderComponent } from '#/modules/home/components/header';
import { personalInfoFormStyles as styles } from './personal-info-form.styles';
import { useUpdateUser } from '#/modules/users/api';

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
  const updateUser = useUpdateUser(user?.id, setError);

  function redirectToSettings() {
    navigate(ROUTES.accountSettings);
  }

  function handleFocus(field: FormDataKeys) {
    setFocusedField(field);
  }

  function handleBlur() {
    setFocusedField(null);
  }

  function handleUpdateUserInfo(data: ProfileFormData) {
    updateUser.mutate(data);
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
            Personal info
          </Typography>
        </Breadcrumbs>

        <Typography sx={styles.heading}>Personal info</Typography>

        <ErrorMessage message={getFirstErrorMessage<ProfileFormData>(errors)} />

        <form
          onSubmit={(e) => {
            handleSubmit(handleUpdateUserInfo)(e);
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
