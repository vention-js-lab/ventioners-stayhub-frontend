import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const mapContainerStyles = {
  container: {
    width: '80%',
    height: '400px',
    borderRadius: '20px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    border: '1px solid black',
  },
  mapStyle: {
    borderRadius: '20px',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
} satisfies MuiStylesObject;
