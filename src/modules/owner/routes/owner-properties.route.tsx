import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { HeaderComponent } from '../../home/components/header';
import { ownerPropertiesRouteStyles } from './owner-properties.route.styles';
import { OwnerPropertiesList } from '../components/owner-property/owner-properties-list';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';

export function OwnerPropertiesRoute() {
  const { t } = useTranslation('owner-properties');

  return (
    <Box sx={ownerPropertiesRouteStyles.container}>
      <HeaderComponent />
      <Typography variant="h4" sx={ownerPropertiesRouteStyles.header}>
        {t(TRANSLATION_KEYS.owner_properties.my_properties)}
      </Typography>
      <Container maxWidth="xl">
        <OwnerPropertiesList />
      </Container>
    </Box>
  );
}
