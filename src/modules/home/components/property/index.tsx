import { Container, Divider, Box } from '@mui/material';
import { ApartmentCard } from '#/modules/home/components/property/propertyCard';
import data from './dummy.json';

export function PropertyList() {
  return (
    <Container maxWidth="xl">
      <Divider
        sx={{
          mt: { xs: 8, sm: 10, md: 12 },
          mb: { xs: 4, sm: 5, md: 6 },
          borderColor: '#DDDDDD',
          borderBottomWidth: 1,
          width: '100%',
          opacity: 1,
          '&::before, &::after': {
            borderColor: '#DDDDDD',
          },
        }}
      />
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
    </Container>
  );
}
