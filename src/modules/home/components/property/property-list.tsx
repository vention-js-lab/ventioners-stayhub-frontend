import Box from '@mui/material/Box';
import { ApartmentCard } from '#/modules/home/components/property/property-card';
import Typography from '@mui/material/Typography';
import { type Accommodation } from '../../types/accommodation.type';
import { propertyListStyles } from './property-list.styles';

interface PropertyListProps {
  isLoading: boolean;
  data?: { data: Accommodation[] };
  emptyMessage?: string;
}

export function PropertyList({ emptyMessage = 'No properties found', isLoading, data }: PropertyListProps) {
  if (isLoading) {
    return (
      <Box sx={propertyListStyles.loadingMessage}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  const propertiesData = data?.data ?? [];

  if (propertiesData.length === 0) {
    return (
      <Box sx={propertyListStyles.emptyMessage}>
        <Typography>{emptyMessage}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={propertyListStyles.container}>
      {propertiesData.map((item) => (
        <ApartmentCard key={item.id} {...item} />
      ))}
    </Box>
  );
}
