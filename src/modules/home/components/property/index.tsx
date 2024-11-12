import Box from '@mui/material/Box';
import { ApartmentCard } from '#/modules/home/components/property/propertyCard';
import data from './dummy.json';

export function PropertyList() {
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
      {data.map((item) => (
        <ApartmentCard key={item.id} {...item} />
      ))}
    </Box>
  );
}
