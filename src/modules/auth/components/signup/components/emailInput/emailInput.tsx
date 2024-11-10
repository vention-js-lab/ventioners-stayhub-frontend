import { useRef } from 'react';
import { Box } from '@mui/material';
import { SignupInputProps } from '#/modules/auth/types';
import styles from './emailInput.module.css';

export function EmailInput({ focusedField, handleBlur, handleFocus, register }: SignupInputProps) {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register('email');

  return (
    <Box
      className={`
        ${styles.emailContainer}
        ${focusedField == 'password' && styles.noBorder}
        ${focusedField == 'email' && styles.emailFocused}
      `}
    >
      <Box
        className={`
          ${styles.emailLabel}
          ${focusedField == 'email' && styles.emailFocused}
          ${emailRef.current && emailRef.current.value?.length > 0 && styles.hasContent}
        `}
      >
        Email
      </Box>

      <input
        {...rest}
        autoCorrect="off"
        ref={(e) => {
          ref(e);
          emailRef.current = e;
        }}
        className={`
          ${styles.email}
          ${focusedField == 'email' && styles.emailFocused}
          ${emailRef.current && emailRef.current.value?.length > 0 && styles.hasContent}
        `}
        onFocus={() => handleFocus('email')}
        onBlur={handleBlur}
      />
    </Box>
  );
}
