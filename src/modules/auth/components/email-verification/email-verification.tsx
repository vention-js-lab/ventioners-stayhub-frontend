import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { api } from '#/configs';
import { emailVerificationStyles } from './email-verification.styles';
import { ENDPOINTS, ROUTES } from '../../constants';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';

type EmailVerificationProps = {
  email: string;
  token: string;
};

export function EmailVerification({ email, token }: EmailVerificationProps) {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await api.get(`${ENDPOINTS.verifyEmail}?token=${token}&email=${email}`);
        setStatus('success');
        navigate(ENDPOINTS.root);
      } catch (err) {
        setErrorMsg(`Error while verifying email: ${JSON.stringify(err)}`);
        setStatus('error');
      }
    };

    verifyEmail();
  }, [searchParams, navigate, email, token]);

  const handleResendVerification = async () => {
    try {
      await api.get(`${ENDPOINTS.resendEmail}?token=${token}&email=${email}`);
      setStatus('success');
      navigate(`${ROUTES.checkEmail}?email=${email}`);
    } catch (err) {
      setErrorMsg(`Error while verifying email: ${JSON.stringify(err)}`);
      setStatus('error');
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <>
            <CircularProgress />
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              {t(TRANSLATION_KEYS.auth.verifing_email)}
            </Typography>
          </>
        );
      case 'success':
        return (
          <>
            <CheckCircleOutlineIcon style={{ ...emailVerificationStyles.icon, color: 'green' }} />
            <Typography variant="h5" gutterBottom={true}>
              {t(TRANSLATION_KEYS.auth.verified)}
            </Typography>
          </>
        );
      case 'error':
        return (
          <>
            <ErrorOutlineIcon style={{ ...emailVerificationStyles.icon, color: 'red' }} />
            <Typography variant="h5" gutterBottom={true}>
              {errorMsg}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {t(TRANSLATION_KEYS.auth.failed_to_verify_email)}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              style={emailVerificationStyles.button}
              onClick={() => {
                (async () => {
                  await handleResendVerification();
                })();
              }}
            >
              {t(TRANSLATION_KEYS.auth.resend_verification)}
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="xs" style={emailVerificationStyles.container}>
      <Paper elevation={3} style={emailVerificationStyles.paper}>
        {renderContent()}
      </Paper>
    </Container>
  );
}
