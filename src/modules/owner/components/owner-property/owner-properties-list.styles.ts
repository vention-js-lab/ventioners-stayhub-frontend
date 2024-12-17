import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const ownerPropertiesListStyles = {
  container: {
    py: 4,
    px: { xs: 2, md: 2 },
    minHeight: '100vh',
    backgroundColor: 'background.default',
  },
  spinnerContainer: {
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    mt: 4,
    textAlign: 'center',
  },
} satisfies MuiStylesObject;
