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
import { ROUTES } from '#/modules/users/constants';
import { DeleteAccountModal, ErrorMessage } from '#/modules/users/components';
import { getFirstErrorMessage } from '#/utils';
import { ConfirmPasswordInput, OldPasswordInput, PasswordInput } from '#/modules/users/components/input-fields';
import { HeaderComponent } from '#/modules/home/components/header';
import { UpdatePasswordSchema } from '#/zod';
import { securityFormStyles as styles } from './security-form.styles';
import { useUpdateUserPassword } from '#/modules/users/api';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';
import { useTranslation } from 'react-i18next';

export function SecurityForm() {
  const { t } = useTranslation('account-settings');
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ProfileFormData>({ resolver: zodResolver(UpdatePasswordSchema) });
  const [focusedField, setFocusedField] = useState<FormDataKeys | null>(null);
  const navigate = useNavigate();
  const updateUserPassword = useUpdateUserPassword(setError);

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
    updateUserPassword.mutate(data);
  }

  return (
    <Fragment>
      <HeaderComponent />

      <Box sx={styles.container}>
        <Breadcrumbs separator=">">
          <Link underline="hover" key="1" onClick={redirectToSettings} sx={styles.breadcrumbs}>
            {t(TRANSLATION_KEYS.account_settings.account)}
          </Link>
          <Typography key="2" sx={styles.breadcrumbs}>
            {t(TRANSLATION_KEYS.account_settings.login_security.title)}
          </Typography>
        </Breadcrumbs>

        <Typography sx={styles.heading}>{t(TRANSLATION_KEYS.account_settings.login_security.title)}</Typography>

        <ErrorMessage message={getFirstErrorMessage<ProfileFormData>(errors)} />

        <form
          onSubmit={(e) => {
            handleSubmit(handleUpdateUserPassword)(e);
          }}
        >
          <Typography sx={styles.label}>{t(TRANSLATION_KEYS.account_settings.login_security.update_password)}</Typography>
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
            {t(TRANSLATION_KEYS.account_settings.save)}
          </Button>
        </form>

        <Box sx={styles.deleteAccountContainer}>
          <Typography sx={styles.label}>{t(TRANSLATION_KEYS.account_settings.login_security.deactivate_account)}</Typography>

          <DeleteAccountModal />
        </Box>
      </Box>
    </Fragment>
  );
}
