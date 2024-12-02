import { useRef } from 'react';
import Box from '@mui/material/Box';
import { BasicInput } from '#/modules/users/components';
import { type FormInputProps } from '#/modules/users/types';
import { isInputFieldEmpty } from '#/utils';
import { inputStyles as styles } from '#/modules/users/styles/input.styles';

export function PasswordInput(props: FormInputProps) {
  const { focusedField } = props;
  const passwordRef = useRef<HTMLInputElement>();

  return (
    <Box sx={styles(focusedField === 'password', false).container}>
      <Box sx={styles(focusedField === 'password', !isInputFieldEmpty(passwordRef)).label}>New Password</Box>

      <BasicInput {...props} inputRef={passwordRef} inputName="password" />
    </Box>
  );
}
