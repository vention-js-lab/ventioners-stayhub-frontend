import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { BasicInput } from '#/modules/users/components';
import { type FormInputProps } from '#/modules/users/types';
import { isInputFieldEmpty } from '#/utils';
import { inputStyles as styles } from '#/modules/users/styles/input.styles';

export function FirstNameInput(props: FormInputProps) {
  const { focusedField } = props;
  const firstNameRef = useRef<HTMLInputElement>();

  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  return (
    <Box sx={styles(focusedField === 'firstName', false).container}>
      <Box sx={styles(focusedField === 'firstName', !isInputFieldEmpty(firstNameRef)).label}>First Name</Box>

      <BasicInput {...props} inputName="firstName" inputRef={firstNameRef} />
    </Box>
  );
}
