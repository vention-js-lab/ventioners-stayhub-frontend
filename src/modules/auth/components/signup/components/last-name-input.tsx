import { useRef } from 'react';
import Box from '@mui/material/Box';
import { BasicInput } from '../../shared';
import { type FormInputProps } from '#/modules/auth/types';
import { isInputFieldEmpty } from '#/utils';
import { inputStyles as styles } from '#/modules/auth/styles/input.styles';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';

export function LastNameInput(props: FormInputProps) {
  const { t } = useTranslation('auth');
  const { focusedField } = props;
  const lastNameRef = useRef<HTMLInputElement>();

  return (
    <Box sx={styles(focusedField === 'lastName', false).container}>
      <Box sx={styles(focusedField === 'lastName', !isInputFieldEmpty(lastNameRef)).label}>
        {t(TRANSLATION_KEYS.auth.last_name)}
      </Box>

      <BasicInput {...props} inputRef={lastNameRef} inputName="lastName" />
    </Box>
  );
}
