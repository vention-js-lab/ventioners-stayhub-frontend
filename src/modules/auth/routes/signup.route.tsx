import { Box } from '@mui/material';
import { SignupForm } from '../components';
import styles from '../styles/auth-page.sx';

export function SignupRoute() {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.wrapper}>
        <Box sx={styles.header}>
          <Box sx={styles.title}>Sign up</Box>
        </Box>
        <Box sx={styles.main}>
          <Box sx={styles.heading}>Welcome to StayHub</Box>

          <SignupForm />
        </Box>
      </Box>
    </Box>
  );
}
