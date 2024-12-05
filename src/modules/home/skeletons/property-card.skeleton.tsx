import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { propertyCardSkeletonStyles } from './property-card.skeleton.styles';

export function PropertyCardSkeleton() {
  return (
    <Box sx={propertyCardSkeletonStyles.container}>
      <Skeleton variant="rectangular" height={200} width="100%" />
      <Box sx={propertyCardSkeletonStyles.content}>
        <Skeleton width="60%" height={28} />
        <Skeleton width="40%" height={20} sx={{ mt: 1 }} />
        <Skeleton width="80px" height={20} sx={{ mt: 2 }} />
      </Box>
    </Box>
  );
}
