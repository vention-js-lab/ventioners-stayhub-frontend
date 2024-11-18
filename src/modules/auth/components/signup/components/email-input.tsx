import { useRef } from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { type SignupInputProps } from '#/modules/auth/types';
import { isInputFieldEmpty } from '#/modules/auth/utils';
import { inputStyles as styles } from '#/modules/auth/styles/input.sx';

export function EmailInput({ focusedField, handleBlur, handleFocus, register }: SignupInputProps) {
  const emailRef = useRef<HTMLInputElement>();
  const { ref, ...rest } = register('email');

  return (
    <Box sx={styles(focusedField === 'email', false, focusedField === 'password').container}>
      <Box sx={styles(focusedField === 'email', !isInputFieldEmpty(emailRef)).label}>Email</Box>

      <InputBase
        {...rest}
        autoCorrect="off"
        ref={(e: HTMLDivElement | null) => {
          if (e && e.children.length > 0) {
            ref(e);
            emailRef.current = e.children[0] as HTMLInputElement;
          }
        }}
        sx={styles(focusedField === 'email', !isInputFieldEmpty(emailRef)).input}
        onFocus={() => handleFocus('email')}
        onBlur={handleBlur}
      />
    </Box>
  );
}
