import { Box } from '@mui/material';
import { useRef } from 'react';
import { LoginInputProps } from '#/modules/auth/types';
import styles from './passwordInput.module.css';

export function PasswordInput({ focusedField, handleBlur, handleFocus, register }: LoginInputProps) {
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register('password');

  return (
    <Box
      className={`
        ${styles.passwordContainer}
        ${focusedField == 'password' && styles.passwordFocused}
      `}
    >
      <Box
        className={`
          ${styles.passwordLabel}
          ${focusedField == 'password' && styles.passwordFocused}
          ${passwordRef.current && passwordRef.current.value?.length > 0 && styles.hasContent}
        `}
      >
        Password
      </Box>
      <input
        type="password"
        {...rest}
        ref={(e) => {
          ref(e);
          passwordRef.current = e;
        }}
        className={`
          ${styles.password}
          ${focusedField === 'password' && styles.passwordFocused}
          ${passwordRef.current && passwordRef.current.value?.length > 0 && styles.hasContent}
        `}
        onFocus={() => handleFocus('password')}
        onBlur={handleBlur}
      />
    </Box>
  );
}
