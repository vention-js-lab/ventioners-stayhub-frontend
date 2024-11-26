import Box from '@mui/material/Box';
import { HeaderComponent } from '../components/header';
import { createAccommodationRouteStyles } from './create-accommodation.route.styles';
import { AccommodationProvider } from '../contexts';
import { CreateAccommodation } from '../components/create-accommodation';

export function CreateAccommodatioRoute() {
  return (
    <Box sx={createAccommodationRouteStyles.container}>
      <HeaderComponent />
      <AccommodationProvider>
        <CreateAccommodation />
      </AccommodationProvider>
    </Box>
  );
}
