import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { BasicInput } from '#/modules/users/components';
import { type FormInputProps } from '#/modules/users/types';
import { isInputFieldEmpty } from '#/utils';
import { inputStyles as styles } from '#/modules/users/styles/input.styles';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';

export function FirstNameInput(props: FormInputProps) {
  const { t } = useTranslation('account-settings');
  const { focusedField } = props;
  const firstNameRef = useRef<HTMLInputElement>();

  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  return (
    <Box sx={styles(focusedField === 'firstName', false).container}>
      <Box sx={styles(focusedField === 'firstName', !isInputFieldEmpty(firstNameRef)).label}>
        {t(TRANSLATION_KEYS.account_settings.personal_info.first_name)}
      </Box>

      <BasicInput {...props} inputName="firstName" inputRef={firstNameRef} />
    </Box>
  );
}
