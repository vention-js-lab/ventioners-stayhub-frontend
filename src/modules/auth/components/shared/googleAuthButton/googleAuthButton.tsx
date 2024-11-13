import { Box } from '@mui/material';
import googleIcon from '#/modules/auth/assets/icons/google.svg';
import styles from './googleAuthButton.module.css';

export function GoogleAuthButton() {
  return (
    <form action="http://localhost:3000/api/auth/google/login">
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
