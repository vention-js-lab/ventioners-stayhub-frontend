import { useRef } from 'react';
import Box from '@mui/material/Box';
import { BasicInput } from '#/modules/users/components';
import { type FormInputProps } from '#/modules/users/types';
import { isInputFieldEmpty } from '#/utils';
import { inputStyles as styles } from '#/modules/users/styles/input.styles';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';

export function OldPasswordInput(props: FormInputProps) {
  const { t } = useTranslation('account-settings');
  const { focusedField } = props;
  const oldPasswordRef = useRef<HTMLInputElement>();

  return (
    <Box sx={styles(focusedField === 'oldPassword', false).container}>
      <Box sx={styles(focusedField === 'oldPassword', !isInputFieldEmpty(oldPasswordRef)).label}>
        {t(TRANSLATION_KEYS.account_settings.login_security.old_password)}
      </Box>

      <BasicInput {...props} inputRef={oldPasswordRef} inputName="oldPassword" />
    </Box>
  );
}
