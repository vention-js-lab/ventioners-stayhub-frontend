import { useRef } from 'react';
import { Box } from '@mui/material';
import { SignupInputProps } from '#/modules/auth/types';
import styles from './lastNameInput.module.css';

export function LastNameInput({ focusedField, handleBlur, handleFocus, register }: SignupInputProps) {
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register('lastName');

  return (
    <Box
      className={`
        ${styles.lastNameContainer}
        ${focusedField == 'lastName' && styles.lastNameFocused}
      `}
    >
      <Box
        className={`
          ${styles.lastNameLabel}
          ${focusedField == 'lastName' && styles.lastNameFocused}
          ${lastNameRef.current && lastNameRef.current.value?.length > 0 && styles.hasContent}
        `}
      >
        Last Name
      </Box>
      <input
        {...rest}
        ref={(e) => {
          ref(e);
          lastNameRef.current = e;
        }}
        className={`
          ${styles.lastName}
          ${focusedField === 'lastName' && styles.lastNameFocused}
          ${lastNameRef.current && lastNameRef.current.value?.length > 0 && styles.hasContent}
        `}
        onFocus={() => handleFocus('lastName')}
        onBlur={handleBlur}
      />
    </Box>
  );
}
