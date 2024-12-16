import Box from '@mui/material/Box';
import { createAccommodationRouteStyles } from './create-accommodation.route.styles';
import { CreateAccommodation } from '../components/create-accommodation';
import { HeaderComponent } from '#/modules/home/components/header';

export function CreateAccommodationRoute() {
  return (
    <Box sx={createAccommodationRouteStyles.container}>
      <HeaderComponent />
      <CreateAccommodation />
    </Box>
  );
}
