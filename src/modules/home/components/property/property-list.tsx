import Box from '@mui/material/Box';
import { PropertyCard } from '#/modules/home/components/property/property-card';
import Typography from '@mui/material/Typography';
import { type Accommodation } from '../../types/accommodation.type';
import { propertyListStyles } from './property-list.styles';
import { useWishlistedProperties } from '../../api/get-wishlisted-properties';
import { PropertyListSkeleton } from '../../skeletons/property-list.skeleton';
import { InfoMessageBox } from '../info-message-box/info-message-box';

interface PropertyListProps {
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  data?: { data: Accommodation[] };
  emptyMessage?: string;
}

export function PropertyList({ emptyMessage = 'No properties found', isLoading, isFetchingNextPage, data }: PropertyListProps) {
  const { data: wishlistedData } = useWishlistedProperties();

  if (isLoading) {
    return (
      <Box sx={propertyListStyles.container}>
        <PropertyListSkeleton />;
      </Box>
    );
  }

  const wishlistedIds = wishlistedData?.data.map((item: Accommodation) => item.id) ?? [];
  const propertiesData = data?.data ?? [];

  if (propertiesData.length === 0) {
    return (
      <InfoMessageBox>
        <Typography>{emptyMessage}</Typography>
      </InfoMessageBox>
    );
  }

  return (
    <Box sx={propertyListStyles.container}>
      {propertiesData.map((item) => (
        <PropertyCard key={item.id} {...item} isAddedToWishlist={wishlistedIds.includes(item.id)} />
      ))}

      {isFetchingNextPage ? <PropertyListSkeleton /> : null}
    </Box>
  );
}
