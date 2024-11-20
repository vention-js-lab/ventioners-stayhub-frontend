import { useRef } from 'react';
import Box from '@mui/material/Box';
import { BasicInput } from '../../shared';
import { type FormInputProps } from '#/modules/auth/types';
import { isInputFieldEmpty } from '#/modules/auth/utils';
import { inputStyles as styles } from '#/modules/auth/styles/input.styles';

export function PasswordInput(props: FormInputProps) {
  const { focusedField } = props;
  const passwordRef = useRef<HTMLInputElement>();

  return (
    <Box sx={styles(focusedField === 'password', false, focusedField === 'confirmPassword').container}>
      <Box sx={styles(focusedField === 'password', !isInputFieldEmpty(passwordRef)).label}>Password</Box>

      <BasicInput {...props} inputRef={passwordRef} inputName="password" />
    </Box>
  );
}
