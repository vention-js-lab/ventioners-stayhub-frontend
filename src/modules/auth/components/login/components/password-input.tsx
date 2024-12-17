import { useRef } from 'react';
import Box from '@mui/material/Box';
import { type FormInputProps } from '#/modules/auth/types';
import { isInputFieldEmpty } from '#/utils';
import { inputStyles as styles } from '#/modules/auth/styles/input.styles';
import { BasicInput } from '../../shared';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';

export function PasswordInput(props: FormInputProps) {
  const { t } = useTranslation('auth');
  const { focusedField } = props;
  const passwordRef = useRef<HTMLInputElement>();

  return (
    <Box sx={styles(focusedField === 'password', false).container}>
      <Box sx={styles(focusedField === 'password', !isInputFieldEmpty(passwordRef)).label}>
        {t(TRANSLATION_KEYS.auth.password)}
      </Box>

      <BasicInput {...props} inputRef={passwordRef} inputName="password" />
    </Box>
  );
}
