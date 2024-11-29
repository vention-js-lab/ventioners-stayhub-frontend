import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const userProfilePictureStyles = {
  container: {
    width: '32px',
    height: '32px',
    large: {
      width: '200px',
      height: '200px',
      '@media (max-width: 450px)': {
        width: '120px',
        height: '120px',
      },
    },
    backgroundColor: '#000000',
    color: '#ffffff',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5px',
  },
  text: {
    fontSize: '15px',
    fontWeight: '400',
    textTransform: 'uppercase',
  },
} satisfies MuiStylesObject;
