import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { checkMailBoxStyles } from './check-mail-box.styles';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';

export function CheckMailbox({ email }: { email: string }) {
  const { t } = useTranslation('auth');
  return (
    <Container maxWidth="xs" sx={checkMailBoxStyles.container}>
      <Paper elevation={3} sx={checkMailBoxStyles.paper}>
        <EmailOutlinedIcon sx={checkMailBoxStyles.icon} />
        <Typography variant="h5" gutterBottom={true}>
          {t(TRANSLATION_KEYS.auth.verify_email)}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {t(TRANSLATION_KEYS.auth.send_verification)}
        </Typography>
        <Typography variant="subtitle1" color="primary">
          {email}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {t(TRANSLATION_KEYS.auth.check_your_inbox)}
        </Typography>
      </Paper>
    </Container>
  );
}
