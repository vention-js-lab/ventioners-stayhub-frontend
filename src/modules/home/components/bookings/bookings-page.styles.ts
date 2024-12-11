import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const bookingsPageStyles = {
  container: {
    py: 4,
    px: { xs: 2, md: 4 },
    minHeight: '100vh',
    backgroundColor: 'background.default',
  },
  header: {
    mb: 3,
    fontWeight: 300,
    textAlign: 'center',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
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
