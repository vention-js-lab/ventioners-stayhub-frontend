import Box from '@mui/material/Box';
import { HeaderComponent } from '../components/header';
import { PropertyList } from '../components/property';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { CategoryList } from '../components/category/category-list';

export function HomeRoute() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <HeaderComponent />
      <Container maxWidth="xl">
        <Divider
          sx={{
            mt: { xs: 8, sm: 10, md: 12 },
            borderColor: '#DDDDDD',
            borderBottomWidth: 1,
            width: '100%',
            opacity: 1,
            '&::before, &::after': {
              borderColor: '#DDDDDD',
            },
          }}
        />
        <CategoryList />
        <PropertyList />
      </Container>
    </Box>
  );
}
