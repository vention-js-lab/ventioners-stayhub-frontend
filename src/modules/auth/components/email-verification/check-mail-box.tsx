import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { checkMailBoxStyles } from './check-mail-box.styles';

export function CheckMailbox({ email }: { email: string }) {
  return (
    <Container maxWidth="xs" sx={checkMailBoxStyles.container}>
      <Paper elevation={3} sx={checkMailBoxStyles.paper}>
        <EmailOutlinedIcon sx={checkMailBoxStyles.icon} />
        <Typography variant="h5" gutterBottom={true}>
          Verify Your Email
        </Typography>
        <Typography variant="body1" color="textSecondary">
          We have sent a verification email to
        </Typography>
        <Typography variant="subtitle1" color="primary">
          {email}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Please check your inbox and click the verification link to activate your account.
        </Typography>
      </Paper>
    </Container>
  );
}
