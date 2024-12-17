import Box from '@mui/material/Box';
import { SignupForm } from '../components';
import { authPageStyles as styles } from '../styles/auth-page.styles';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';

export function SignupRoute() {
  const { t } = useTranslation('auth');

  return (
    <Box sx={styles.container}>
      <Box sx={styles.wrapper}>
        <Box sx={styles.header}>
          <Box sx={styles.title}>{t(TRANSLATION_KEYS.auth.sign_up)}</Box>
        </Box>
        <Box sx={styles.main}>
          <Box sx={styles.heading}>{t(TRANSLATION_KEYS.auth.welcome)}</Box>

          <SignupForm />
        </Box>
      </Box>
    </Box>
  );
}
