import { useRef } from 'react';
import Box from '@mui/material/Box';
import { BasicInput } from '#/modules/users/components';
import { type FormInputProps } from '../../types';
import { isInputFieldEmpty } from '#/utils';
import { inputStyles as styles } from '../../styles/input.styles';

export function ConfirmPasswordInput(props: FormInputProps) {
  const { focusedField } = props;
  const cpasswordRef = useRef<HTMLInputElement>();

  return (
    <Box sx={styles(focusedField === 'confirmPassword', false).container}>
      <Box sx={styles(focusedField === 'confirmPassword', !isInputFieldEmpty(cpasswordRef)).label}>Confirm New Password</Box>

      <BasicInput {...props} inputRef={cpasswordRef} inputName="confirmPassword" />
    </Box>
  );
}
