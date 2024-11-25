import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const propertyDetailsStyles = {
  container: {
    maxWidth: 800,
    margin: '32px auto 0',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: '16px',
  },
  numberSelector: {
    marginBottom: '12px',
  },
  sizes: {
    xs: 12,
    sm: 6,
    md: 3,
  },
} satisfies MuiStylesObject;
