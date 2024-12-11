import Box from '@mui/material/Box';
import { HeaderComponent } from '../components/header';
import { createAccommodationRouteStyles } from './create-accommodation.route.styles';
import { CreateAccommodation } from '../components/create-accommodation';

export function CreateAccommodationRoute() {
  return (
    <Box sx={createAccommodationRouteStyles.container}>
      <HeaderComponent />
      <CreateAccommodation />
    </Box>
  );
}
