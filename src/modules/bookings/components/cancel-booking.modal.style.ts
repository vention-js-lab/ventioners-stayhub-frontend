import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const cancelBookingModalStyles = {
  title: {
    typography: 'h6',
    fontWeight: 600,
    color: 'error.main',
    padding: '24px',
  },
  content: { padding: '0 24px' },
  contentText: { mb: 3 },
  contentTextContainer: {
    backgroundColor: 'grey.200',
    color: 'text.primary',
    p: 2,
    borderRadius: 2,
    mb: 2,
  },
  actions: { padding: '24px' },
} satisfies MuiStylesObject;
