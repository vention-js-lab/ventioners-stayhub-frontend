import { useRef } from 'react';
import Box from '@mui/material/Box';
import { BasicInput } from '../../shared';
import { type FormInputProps } from '#/modules/auth/types';
import { isInputFieldEmpty } from '#/utils';
import { inputStyles as styles } from '#/modules/auth/styles/input.styles';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';

export function ConfirmPasswordInput(props: FormInputProps) {
  const { t } = useTranslation('auth');
  const { focusedField } = props;
  const cpasswordRef = useRef<HTMLInputElement>();

  return (
    <Box sx={styles(focusedField === 'confirmPassword', false).container}>
      <Box sx={styles(focusedField === 'confirmPassword', !isInputFieldEmpty(cpasswordRef)).label}>
        {t(TRANSLATION_KEYS.auth.confirm_password)}
      </Box>

      <BasicInput {...props} inputRef={cpasswordRef} inputName="confirmPassword" />
    </Box>
  );
}
