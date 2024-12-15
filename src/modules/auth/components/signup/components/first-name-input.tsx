import { useRef } from 'react';
import Box from '@mui/material/Box';
import { BasicInput } from '../../shared';
import { type FormInputProps } from '#/modules/auth/types';
import { isInputFieldEmpty } from '#/utils';
import { inputStyles as styles } from '#/modules/auth/styles/input.styles';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';

export function FirstNameInput(props: FormInputProps) {
  const { t } = useTranslation('auth');
  const { focusedField } = props;
  const firstNameRef = useRef<HTMLInputElement>();

  return (
    <Box sx={styles(focusedField === 'firstName', false, focusedField === 'lastName').container}>
      <Box sx={styles(focusedField === 'firstName', !isInputFieldEmpty(firstNameRef)).label}>
        {t(TRANSLATION_KEYS.auth.first_name)}
      </Box>

      <BasicInput {...props} inputName="firstName" inputRef={firstNameRef} />
    </Box>
  );
}
