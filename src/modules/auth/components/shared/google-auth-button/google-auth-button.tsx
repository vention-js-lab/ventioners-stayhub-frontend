import { Box, Button } from '@mui/material';
import { ENDPOINTS } from '#/modules/auth/constants';
import googleIcon from '#/modules/auth/assets/icons/google.svg';
import styles from './google-auth-button.sx';

export function GoogleAuthButton() {
  return (
    <form action={`${import.meta.env.VITE_API_URL}${ENDPOINTS.googleAuth}`}>
      <Box sx={styles.wrapper}>
        <Button type="submit" disableRipple sx={styles.container}>
          <Box sx={styles.logo}>
            <img src={googleIcon} alt="Google Icon" />
          </Box>
          <Box sx={styles.text}>Continue with Google</Box>
        </Button>
      </Box>
    </form>
  );
}
