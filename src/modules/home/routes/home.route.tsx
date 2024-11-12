import Box from '@mui/material/Box';
import { HeaderComponent } from '../components/header';
import { PropertyList } from '../components/property';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { CategoryList } from '../components/category/category-list';
import { homeRouteStyles } from './home.route.styles';

export function HomeRoute() {
  return (
    <Box sx={homeRouteStyles.container}>
      <HeaderComponent />
      <Container maxWidth="xl">
        <Divider sx={homeRouteStyles.divider} />
        <CategoryList />
        <PropertyList />
      </Container>
    </Box>
  );
}
