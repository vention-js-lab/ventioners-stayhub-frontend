import { useRef } from 'react';
import { type SignupInputProps } from '#/modules/auth/types';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import { isInputFieldEmpty } from '#/modules/auth/utils';
import { inputStyles as styles } from '#/modules/auth/styles/input.sx';

export function PasswordInput({ focusedField, handleBlur, handleFocus, register }: SignupInputProps) {
  const passwordRef = useRef<HTMLInputElement>();
  const { ref, ...rest } = register('password');

  return (
    <Box sx={styles(focusedField === 'password', false, focusedField === 'cpassword').container}>
      <Box sx={styles(focusedField === 'password', !isInputFieldEmpty(passwordRef)).label}>Password</Box>
      <InputBase
        type="password"
        {...rest}
        ref={(e: HTMLDivElement | null) => {
          if (e && e.children.length > 0) {
            ref(e);
            passwordRef.current = e.children[0] as HTMLInputElement;
          }
        }}
        sx={styles(focusedField === 'password', !isInputFieldEmpty(passwordRef)).input}
        onFocus={() => handleFocus('password')}
        onBlur={handleBlur}
      />
    </Box>
  );
}
