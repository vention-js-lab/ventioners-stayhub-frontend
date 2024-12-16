import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { HeaderComponent } from '../../home/components/header';
import { ownerPropertiesRouteStyles } from './owner-properties.route.styles';
import { OwnerPropertiesList } from '../components/owner-property/owner-properties-list';

export function OwnerPropertiesRoute() {
  return (
    <Box sx={ownerPropertiesRouteStyles.container}>
      <HeaderComponent />
      <Container maxWidth="xl">
        <OwnerPropertiesList />
      </Container>
    </Box>
  );
}
