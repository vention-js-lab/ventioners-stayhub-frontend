import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const homeRouteStyles = {
  container: { display: 'flex', flexDirection: 'column', width: '100%' },
  divider: {
    mt: { xs: 8, sm: 10, md: 12 },
    borderColor: '#DDDDDD',
    borderBottomWidth: 1,
    width: '100%',
    opacity: 1,
    '&::before, &::after': {
      borderColor: '#DDDDDD',
    },
  },
} satisfies MuiStylesObject;
