import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const categoryListStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  scrollContainer: {
    display: 'flex',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    scrollbarWidth: 'none',
    alignItems: 'center',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
} satisfies MuiStylesObject;
