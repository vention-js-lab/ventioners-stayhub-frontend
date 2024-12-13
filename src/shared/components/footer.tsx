import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { footerStyles } from './footer.styles';

export function Footer() {
  return (
    <Box component="footer" sx={footerStyles.footer}>
      <Container maxWidth="lg" sx={footerStyles.container}>
        <Typography variant="body2" align="center" sx={footerStyles.text}>
          © {new Date().getFullYear()} Ventioners LLC. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}
