import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const mapContainerStyles = {
  container: {
    width: '100%',
    height: '435px',
    border: '1px solid black',
    position: 'relative',
    overflow: 'hidden',
  },
  mapStyle: {
    height: '100%',
    width: '100%',
  },
  accommodationInfo: {
    maxWidth: '100%',
    height: '150px',
    overflow: 'hidden',
  },
  imageInfo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    marginBottom: '50px',
  },
} satisfies MuiStylesObject;
