import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const infoMessageBoxStyles = {
  container: {
    textAlign: 'center',
    px: { xs: 1, sm: 2, md: 3 },
    py: { xs: 2, sm: 3, md: 4 },
    color: 'text.secondary',
    typography: 'body2',
    marginTop: 2,
  },
} satisfies MuiStylesObject;
