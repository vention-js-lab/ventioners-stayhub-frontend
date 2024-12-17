import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { footerStyles } from './footer.styles';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';

export function Footer() {
  const { t } = useTranslation('home');
  return (
    <Box component="footer" sx={footerStyles.footer}>
      <Container maxWidth="lg" sx={footerStyles.container}>
        <Typography variant="body2" align="center" sx={footerStyles.text}>
          © {new Date().getFullYear()} Ventioners LLC. {t(TRANSLATION_KEYS.home.footer.rights)}
        </Typography>
      </Container>
    </Box>
  );
}
