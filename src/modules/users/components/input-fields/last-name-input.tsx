import { useRef } from 'react';
import Box from '@mui/material/Box';
import { BasicInput } from '#/modules/users/components';
import { type FormInputProps } from '#/modules/users/types';
import { isInputFieldEmpty } from '#/utils';
import { inputStyles as styles } from '#/modules/users/styles/input.styles';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';
import { useTranslation } from 'react-i18next';

export function LastNameInput(props: FormInputProps) {
  const { t } = useTranslation('account-settings');
  const { focusedField } = props;
  const lastNameRef = useRef<HTMLInputElement>();

  return (
    <Box sx={styles(focusedField === 'lastName', false).container}>
      <Box sx={styles(focusedField === 'lastName', !isInputFieldEmpty(lastNameRef)).label}>
        {t(TRANSLATION_KEYS.account_settings.personal_info.last_name)}
      </Box>

      <BasicInput {...props} inputRef={lastNameRef} inputName="lastName" />
    </Box>
  );
}
