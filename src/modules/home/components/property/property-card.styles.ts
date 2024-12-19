import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const propertyCardStyles = {
  favoriteIconStyle: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    padding: '4px',
    fontSize: '32px',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
} satisfies MuiStylesObject;
