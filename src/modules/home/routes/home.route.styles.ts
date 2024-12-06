import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const homeRouteStyles = {
  container: { display: 'flex', flexDirection: 'column', width: '100%' },
  mapContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '500px',
  },
  divider: {
    mt: { xs: 10, sm: 10, md: 12 },
    borderColor: '#DDDDDD',
    borderBottomWidth: 1,
    width: '100%',
    opacity: 1,
    '&::before, &::after': {
      borderColor: '#DDDDDD',
    },
  },
} satisfies MuiStylesObject;
