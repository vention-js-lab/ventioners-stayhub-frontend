import { useRef } from 'react';
import { Box } from '@mui/material';
import { SignupInputProps } from '#/modules/auth/types';
import styles from './confirm-password-input.module.css';

export function ConfirmPasswordInput({ focusedField, handleBlur, handleFocus, register }: SignupInputProps) {
  const cpasswordRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register('confirmPassword');

  return (
    <Box
      className={`
        ${styles.cpasswordContainer}
        ${focusedField == 'cpassword' && styles.cpasswordFocused}
      `}
    >
      <Box
        className={`
          ${styles.cpasswordLabel}
          ${focusedField == 'cpassword' && styles.cpasswordFocused}
          ${cpasswordRef.current && cpasswordRef.current.value?.length > 0 && styles.hasContent}
        `}
      >
        Confirm Password
      </Box>
      <input
        type="password"
        {...rest}
        ref={(e) => {
          ref(e);
          cpasswordRef.current = e;
        }}
        className={`
          ${styles.cpassword}
          ${focusedField === 'cpassword' && styles.cpasswordFocused}
          ${cpasswordRef.current && cpasswordRef.current.value?.length > 0 && styles.hasContent}
        `}
        onFocus={() => handleFocus('cpassword')}
        onBlur={handleBlur}
      />
    </Box>
  );
}
