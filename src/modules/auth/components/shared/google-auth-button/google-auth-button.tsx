import { Box } from '@mui/material';
import googleIcon from '#/modules/auth/assets/icons/google.svg';
import styles from './google-auth-button.module.css';

export function GoogleAuthButton() {
  return (
    <form action={`${import.meta.env.VITE_API_URL}/auth/google/login`}>
      <Box className={styles.wrapper}>
        <button type="submit" className={styles.container}>
          <Box className={styles.logo}>
            <img src={googleIcon} alt="Google Icon" />
          </Box>
          <Box className={styles.text}>Continue with Google</Box>
        </button>
      </Box>
    </form>
  );
}
