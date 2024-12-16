import { type MuiStylesObject } from '#/types/mui-styles-object.type.ts';

export const imageUploaderStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    padding: 2,
  },
  uploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    border: '2px dashed',
    borderColor: 'grey.300',
    borderRadius: 2,
    padding: 3,
    textAlign: 'center',
  },
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(2, 1fr)',
      sm: 'repeat(3, 1fr)',
      md: 'repeat(4, 1fr)',
    },
    gap: 2,
    marginTop: 2,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 2,
    overflow: 'hidden',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    minWidth: 'auto',
    padding: '4px 8px',
  },
  uploadButton: {
    marginTop: 2,
  },
} satisfies MuiStylesObject;
