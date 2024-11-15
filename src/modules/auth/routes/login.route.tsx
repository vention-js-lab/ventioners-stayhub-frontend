import { Box } from '@mui/material';
import { LoginForm } from '../components';
import styles from '../styles/auth-page.module.css';

export function LoginRoute() {
  return (
    <Box className={styles.container}>
      <Box className={styles.wrapper}>
        <Box className={styles.header}>
          <Box className={styles.title}>Log in</Box>
        </Box>
        <Box className={styles.main}>
          <Box className={styles.heading}>Welcome to StayHub</Box>

          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
}
