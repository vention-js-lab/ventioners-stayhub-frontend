import { Box } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import styles from './errorMessage.module.css';

type Props = {
  message?: string;
};

export function ErrorMessage({ message }: Props) {
  if (!message) return false;

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.signWrapper}>
        <Box className={styles.sign}>
          <PriorityHighIcon />
        </Box>
      </Box>
      <Box className={styles.msgContainer}>
        <Box className={styles.title}>Let's try that again</Box>
        <Box className={styles.message}>{message}</Box>
      </Box>
    </Box>
  );
}
