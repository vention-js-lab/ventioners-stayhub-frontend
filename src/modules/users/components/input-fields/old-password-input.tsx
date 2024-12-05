import { useRef } from 'react';
import Box from '@mui/material/Box';
import { BasicInput } from '#/modules/users/components';
import { type FormInputProps } from '#/modules/users/types';
import { isInputFieldEmpty } from '#/utils';
import { inputStyles as styles } from '#/modules/users/styles/input.styles';

export function OldPasswordInput(props: FormInputProps) {
  const { focusedField } = props;
  const oldPasswordRef = useRef<HTMLInputElement>();

  return (
    <Box sx={styles(focusedField === 'oldPassword', false).container}>
      <Box sx={styles(focusedField === 'oldPassword', !isInputFieldEmpty(oldPasswordRef)).label}>Old Password</Box>

      <BasicInput {...props} inputRef={oldPasswordRef} inputName="oldPassword" />
    </Box>
  );
}
