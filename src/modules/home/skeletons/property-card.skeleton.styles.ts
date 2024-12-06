import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const propertyCardSkeletonStyles = {
  container: {
    width: 335,
    height: 360,
    border: '1px solid #ddd',
    borderRadius: 2,
    overflow: 'hidden',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  content: { p: 2 },
} satisfies MuiStylesObject;
