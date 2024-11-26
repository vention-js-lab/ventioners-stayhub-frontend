import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const createAccommodationRouteStyles = {
  container: { display: 'flex', flexDirection: 'column', width: '100%' },
  headerText: {
    px: { xs: 1, sm: 2, md: 3 },
    py: { xs: 2, sm: 3, md: 4 },
  },
} satisfies MuiStylesObject;
