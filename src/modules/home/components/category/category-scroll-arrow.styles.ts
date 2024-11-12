import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const categoryScrollArrowStyles = {
  arrowButton: {
    display: { xs: 'none', sm: 'flex' },
    border: '1px solid #DDDDDD',
    borderRadius: '50%',
    p: 1,
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      cursor: 'pointer',
    },
    position: 'absolute',
    zIndex: 2,
  },
} satisfies MuiStylesObject;
