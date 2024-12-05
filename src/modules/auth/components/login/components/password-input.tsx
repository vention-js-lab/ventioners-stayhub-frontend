import { useRef } from 'react';
import Box from '@mui/material/Box';
import { type FormInputProps } from '#/modules/auth/types';
import { isInputFieldEmpty } from '#/utils';
import { inputStyles as styles } from '#/modules/auth/styles/input.styles';
import { BasicInput } from '../../shared';

export function PasswordInput(props: FormInputProps) {
  const { focusedField } = props;
  const passwordRef = useRef<HTMLInputElement>();

  return (
    <Box sx={styles(focusedField === 'password', false).container}>
      <Box sx={styles(focusedField === 'password', !isInputFieldEmpty(passwordRef)).label}>Password</Box>

      <BasicInput {...props} inputRef={passwordRef} inputName="password" />
    </Box>
  );
}
