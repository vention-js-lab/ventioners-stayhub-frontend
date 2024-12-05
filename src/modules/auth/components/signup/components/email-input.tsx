import { useRef } from 'react';
import Box from '@mui/material/Box';
import { BasicInput } from '../../shared';
import { type FormInputProps } from '#/modules/auth/types';
import { isInputFieldEmpty } from '#/utils';
import { inputStyles as styles } from '#/modules/auth/styles/input.styles';

export function EmailInput(props: FormInputProps) {
  const { focusedField } = props;
  const emailRef = useRef<HTMLInputElement>();

  return (
    <Box sx={styles(focusedField === 'email', false, focusedField === 'password').container}>
      <Box sx={styles(focusedField === 'email', !isInputFieldEmpty(emailRef)).label}>Email</Box>

      <BasicInput {...props} inputName="email" inputRef={emailRef} />
    </Box>
  );
}
