import Box from '@mui/material/Box';
import { useOwnerProperties } from '../../api/get-owner-properties';
import { OwnerPropertyCard } from './owner-property-card';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';
import { toast } from 'react-toastify';
import Container from '@mui/material/Container';
import { ownerPropertiesListStyles } from './owner-properties-list.styles';
import { loadingSpinnerStyles } from '#/styles';

export function OwnerPropertiesList() {
  const { t } = useTranslation('owner-properties');
  const { data, isLoading, isError } = useOwnerProperties();

  if (isLoading) {
    return (
      <Box sx={loadingSpinnerStyles.container}>
        <CircularProgress sx={loadingSpinnerStyles.spinner} />
      </Box>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <Box sx={ownerPropertiesListStyles.container}>
        <Box sx={ownerPropertiesListStyles.emptyState}>
          <Typography variant="h6" color="text.secondary">
            {t(TRANSLATION_KEYS.owner_properties.no_properties)}
          </Typography>
        </Box>
      </Box>
    );
  }

  if (isError) {
    toast.error('Error fetching properties');
    return (
      <Container maxWidth="md">
        <Typography variant="h5">{t(TRANSLATION_KEYS.owner_properties.unable_to_load)}</Typography>
      </Container>
    );
  }

  const properties = data.data;

  return (
    <Box sx={ownerPropertiesListStyles.container}>
      {properties.map((property) => (
        <OwnerPropertyCard key={property.id} {...property} />
      ))}
    </Box>
  );
}
