import Box from '@mui/material/Box';
import { ApartmentCard } from '#/modules/home/components/property/property-card';
import { useProperties } from '../../api/get-properties';
import Typography from '@mui/material/Typography';

export function PropertyList({ selectedCategory }: { selectedCategory: string }) {
  const propertiesQuery = useProperties({ page: 1, categoryId: selectedCategory });

  if (propertiesQuery.isLoading) {
    return (
      <Box>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  const propertiesData = propertiesQuery.data?.data ?? [];

  if (propertiesData.length === 0) {
    return (
      <Box>
        <Typography>No properties found</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
        gap: { xs: 2, sm: 3, md: 4 },
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {propertiesData.map((item) => {
        return <ApartmentCard key={item.id} {...item} />;
      })}
    </Box>
  );
}
