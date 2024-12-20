import Box from '@mui/material/Box';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { errorMessageStyles as styles } from './error-message.styles';

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
        <Box sx={styles.title}>Let&apos;s try that again</Box>
        <Box sx={styles.message}>{message}</Box>
      </Box>
    </Box>
  );
}
