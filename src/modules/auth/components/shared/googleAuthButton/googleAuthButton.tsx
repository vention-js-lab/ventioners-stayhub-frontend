import { Box } from '@mui/material';
import googleIcon from '#/modules/auth/assets/icons/google.svg';
import styles from './googleAuthButton.module.css';

export function GoogleAuthButton() {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    console.log(e.target);
    console.log('continue with google');
  }

  return (
    <button className={styles.wrapper} onClick={handleClick}>
      <Box className={styles.container}>
        <Box className={styles.logo}>
          <img src={googleIcon} alt="Google Icon" />
        </Box>
        <Box className={styles.text}>Continue with Google</Box>
      </Box>
    </button>
  );
}
