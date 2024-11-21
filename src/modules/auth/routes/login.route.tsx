import Box from '@mui/material/Box';
import { LoginForm } from '../components';
import { authPageStyles as styles } from '../styles/auth-page.styles';

export function LoginRoute() {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.wrapper}>
        <Box sx={styles.header}>
          <Box sx={styles.title}>Log in</Box>
        </Box>
        <Box sx={styles.main}>
          <Box sx={styles.heading}>Welcome to StayHub</Box>

          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
}
