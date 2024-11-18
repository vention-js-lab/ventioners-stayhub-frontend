import { useRef } from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { type SignupInputProps } from '#/modules/auth/types';
import { isInputFieldEmpty } from '#/modules/auth/utils';
import { inputStyles as styles } from '#/modules/auth/styles/input.sx';

export function FirstNameInput({ focusedField, handleBlur, handleFocus, register }: SignupInputProps) {
  const firstNameRef = useRef<HTMLInputElement>();
  const { ref, ...rest } = register('firstName');

  return (
    <Box sx={styles(focusedField === 'firstName', false, focusedField === 'lastName').container}>
      <Box sx={styles(focusedField === 'firstName', !isInputFieldEmpty(firstNameRef)).label}>First Name</Box>

      <InputBase
        {...rest}
        autoCorrect="off"
        ref={(e: HTMLDivElement | null) => {
          if (e && e.children.length > 0) {
            ref(e);
            firstNameRef.current = e.children[0] as HTMLInputElement;
          }
        }}
        sx={styles(focusedField === 'firstName', !isInputFieldEmpty(firstNameRef)).input}
        onFocus={() => handleFocus('firstName')}
        onBlur={handleBlur}
      />
    </Box>
  );
}
