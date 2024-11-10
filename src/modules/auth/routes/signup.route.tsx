import { Box } from '@mui/material';
import { SignupForm } from '../components';
import styles from '../styles/authPage.module.css';

export function SignupRoute() {
  return (
    <Box className={styles.container}>
      <Box className={styles.wrapper}>
        <Box className={styles.header}>
          <Box className={styles.title}>Sign up</Box>
        </Box>
        <Box className={styles.main}>
          <Box className={styles.heading}>Welcome to StayHub</Box>

          <SignupForm />
        </Box>
      </Box>
    </Box>
  );
}
