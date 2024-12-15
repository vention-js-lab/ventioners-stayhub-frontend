import { useRef } from 'react';
import Box from '@mui/material/Box';
import { BasicInput } from '../../shared';
import { type FormInputProps } from '#/modules/auth/types';
import { isInputFieldEmpty } from '#/utils';
import { inputStyles as styles } from '#/modules/auth/styles/input.styles';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';

export function EmailInput(props: FormInputProps) {
  const { t } = useTranslation('auth');
  const { focusedField } = props;
  const emailRef = useRef<HTMLInputElement>();

  return (
    <Box sx={styles(focusedField === 'email', false, focusedField === 'password').container}>
      <Box sx={styles(focusedField === 'email', !isInputFieldEmpty(emailRef)).label}>{t(TRANSLATION_KEYS.auth.email)}</Box>

      <BasicInput {...props} inputName="email" inputRef={emailRef} />
    </Box>
  );
}
