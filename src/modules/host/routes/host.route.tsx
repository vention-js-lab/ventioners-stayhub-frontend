import Box from '@mui/material/Box';
import { AccommodationProvider } from '#/modules/host/context';
import { AccommodationCreation, Header } from '#/modules/host/components';
import { hostRouteStyles } from '#/modules/host/routes/host-route.styles.ts';

export function HostRoute() {
  return (
    <Box sx={hostRouteStyles.container}>
      <Header />
      <AccommodationProvider>
        <AccommodationCreation />
      </AccommodationProvider>
    </Box>
  );
}
