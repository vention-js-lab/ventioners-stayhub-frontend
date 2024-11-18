import { useRef } from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { type SignupInputProps } from '#/modules/auth/types';
import { isInputFieldEmpty } from '#/modules/auth/utils';
import { inputStyles as styles } from '#/modules/auth/styles/input.sx';

export function ConfirmPasswordInput({ focusedField, handleBlur, handleFocus, register }: SignupInputProps) {
  const cpasswordRef = useRef<HTMLInputElement>();
  const { ref, ...rest } = register('confirmPassword');

  return (
    <Box sx={styles(focusedField === 'cpassword', false).container}>
      <Box sx={styles(focusedField === 'cpassword', !isInputFieldEmpty(cpasswordRef)).label}>Confirm Password</Box>
      <InputBase
        type="password"
        {...rest}
        ref={(e: HTMLDivElement | null) => {
          if (e && e.children.length > 0) {
            ref(e);
            cpasswordRef.current = e.children[0] as HTMLInputElement;
          }
        }}
        sx={styles(focusedField === 'cpassword', !isInputFieldEmpty(cpasswordRef)).input}
        onFocus={() => handleFocus('cpassword')}
        onBlur={handleBlur}
      />
    </Box>
  );
}
