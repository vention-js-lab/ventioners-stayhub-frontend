import Box from '@mui/material/Box';
import { useOwnerProperties } from '../api/get-owner-properties';
import { OwnerPropertyCard } from './owner-property-card';
import { ownerPropertiesListStyles } from './owner-properties-list.styles';

export function OwnerPropertiesList() {
  const { data, isLoading } = useOwnerProperties();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || data.data.length === 0) {
    return <div>No properties found</div>;
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
