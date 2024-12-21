import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const wishlistRouteStyles = {
  container: { display: 'flex', flexDirection: 'column', width: '100%' },
  headerText: {
    fontWeight: 500,
    px: { xs: 1, sm: 2, md: 3 },
    py: { xs: 2, sm: 3, md: 4 },
  },
} satisfies MuiStylesObject;
