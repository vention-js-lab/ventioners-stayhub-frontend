import { useRef } from 'react';
import Box from '@mui/material/Box';
import { BasicInput } from '#/modules/users/components';
import { type FormInputProps } from '#/modules/users/types';
import { isInputFieldEmpty } from '#/utils';
import { inputStyles as styles } from '#/modules/users/styles/input.styles';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';
import { useTranslation } from 'react-i18next';

export function EmailInput(props: FormInputProps) {
  const { t } = useTranslation('account-settings');
  const { focusedField } = props;
  const emailRef = useRef<HTMLInputElement>();

  return (
    <Box sx={styles(focusedField === 'email', false).container}>
      <Box sx={styles(focusedField === 'email', !isInputFieldEmpty(emailRef)).label}>
        {t(TRANSLATION_KEYS.account_settings.personal_info.email)}
      </Box>

      <BasicInput {...props} inputName="email" inputRef={emailRef} />
    </Box>
  );
}
