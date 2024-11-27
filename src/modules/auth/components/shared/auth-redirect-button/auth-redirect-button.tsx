import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import mailIcon from '#/assets/mail.svg';
import { authRedirectButtonStyles as styles } from './auth-redirect-button.styles';
import { ROUTES } from '#/modules/auth/constants';

type Props = {
  message: string;
  link: (typeof ROUTES)[keyof typeof ROUTES];
};

export function AuthRedirectButton({ link, message }: Props) {
  return (
    <Link to={link} style={styles.link}>
      <Box sx={styles.wrapper}>
        <Box sx={styles.container}>
          <Box sx={styles.logo}>
            <img src={mailIcon} alt="Google Icon" />
          </Box>
          <Box sx={styles.text}>{message}</Box>
        </Box>
      </Box>
    </Link>
  );
}
