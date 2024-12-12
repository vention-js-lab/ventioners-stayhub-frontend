import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const contentWrapperStyles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flex: '1 0 auto',
  },
} satisfies MuiStylesObject;
