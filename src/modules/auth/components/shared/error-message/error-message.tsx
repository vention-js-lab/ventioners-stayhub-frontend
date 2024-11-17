import { Box } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import styles from './error-message.sx';

type Props = {
  message?: string;
};

export function ErrorMessage({ message }: Props) {
  if (!message) return false;

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.signWrapper}>
        <Box sx={styles.sign}>
          <PriorityHighIcon />
        </Box>
      </Box>
      <Box sx={styles.msgContainer}>
        <Box sx={styles.title}>Let's try that again</Box>
        <Box sx={styles.message}>{message}</Box>
      </Box>
    </Box>
  );
}
