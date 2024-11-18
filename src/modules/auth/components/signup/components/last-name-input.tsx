import { useRef } from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { type SignupInputProps } from '#/modules/auth/types';
import { isInputFieldEmpty } from '#/modules/auth/utils';
import { inputStyles as styles } from '#/modules/auth/styles/input.sx';

export function LastNameInput({ focusedField, handleBlur, handleFocus, register }: SignupInputProps) {
  const lastNameRef = useRef<HTMLInputElement>();
  const { ref, ...rest } = register('lastName');

  return (
    <Box sx={styles(focusedField === 'lastName', false).container}>
      <Box sx={styles(focusedField === 'lastName', !isInputFieldEmpty(lastNameRef)).label}>Last Name</Box>
      <InputBase
        {...rest}
        ref={(e: HTMLDivElement | null) => {
          if (e && e.children.length > 0) {
            ref(e);
            lastNameRef.current = e.children[0] as HTMLInputElement;
          }
        }}
        sx={styles(focusedField === 'lastName', !isInputFieldEmpty(lastNameRef)).input}
        onFocus={() => handleFocus('lastName')}
        onBlur={handleBlur}
      />
    </Box>
  );
}
