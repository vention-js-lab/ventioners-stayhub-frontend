import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ENDPOINTS } from '#/modules/auth/constants';
import googleIcon from '#/assets/google.svg';
import { googleAuthButtonStyles as styles } from './google-auth-button.styles';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';

export function GoogleAuthButton() {
  const { t } = useTranslation('auth');

  return (
    <form action={`${import.meta.env.VITE_API_URL}${ENDPOINTS.googleAuth}`}>
      <Box sx={styles.wrapper}>
        <Button type="submit" disableRipple={true} sx={styles.container}>
          <Box sx={styles.logo}>
            <img src={googleIcon} alt="Google Icon" />
          </Box>
          <Box sx={styles.text}>{t(TRANSLATION_KEYS.auth.continue_with_google)}</Box>
        </Button>
      </Box>
    </form>
  );
}
