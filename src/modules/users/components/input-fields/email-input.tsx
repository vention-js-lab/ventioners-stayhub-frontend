import { useRef } from 'react';
import Box from '@mui/material/Box';
import { BasicInput } from '#/modules/users/components';
import { type FormInputProps } from '#/modules/users/types';
import { isInputFieldEmpty } from '#/utils';
import { inputStyles as styles } from '#/modules/users/styles/input.styles';

export function EmailInput(props: FormInputProps) {
  const { focusedField } = props;
  const emailRef = useRef<HTMLInputElement>();

  return (
    <Box sx={styles(focusedField === 'email', false).container}>
      <Box sx={styles(focusedField === 'email', !isInputFieldEmpty(emailRef)).label}>Email</Box>

      <BasicInput {...props} inputName="email" inputRef={emailRef} />
    </Box>
  );
}
