import { useRef } from 'react';
import { Box } from '@mui/material';
import { SignupInputProps } from '#/modules/auth/types';
import styles from './first-name-input.module.css';

export function FirstNameInput({ focusedField, handleBlur, handleFocus, register }: SignupInputProps) {
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register('firstName');

  return (
    <Box
      className={`
        ${styles.firstNameContainer}
        ${focusedField == 'lastName' && styles.noBorder}
        ${focusedField == 'firstName' && styles.firstNameFocused}
      `}
    >
      <Box
        className={`
          ${styles.firstNameLabel}
          ${focusedField == 'firstName' && styles.firstNameFocused}
          ${firstNameRef.current && firstNameRef.current.value?.length > 0 && styles.hasContent}
        `}
      >
        First Name
      </Box>

      <input
        {...rest}
        autoCorrect="off"
        ref={(e) => {
          ref(e);
          firstNameRef.current = e;
        }}
        className={`
          ${styles.firstName}
          ${focusedField == 'firstName' && styles.firstNameFocused}
          ${firstNameRef.current && firstNameRef.current.value?.length > 0 && styles.hasContent}
        `}
        onFocus={() => handleFocus('firstName')}
        onBlur={handleBlur}
      />
    </Box>
  );
}
