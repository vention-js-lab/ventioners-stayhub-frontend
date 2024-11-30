import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const userProfilePictureStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  image: {
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
  button: {
    all: 'unset',
    position: 'absolute',
    bottom: '-10px',
    display: 'flex',
    alignItems: 'center',
    paddingX: '16px',
    paddingY: '6px',
    cursor: 'pointer',
    width: '82px',

    color: 'rgb(34, 34, 34)',
    backgroundColor: '#FFFFFF',
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 6px 16px',
    fontWeight: 600,
    fontSize: '14px',
    borderRadius: '20px',

    '& > img': {
      width: '16px',
      height: '16px',
    },
  },
} satisfies MuiStylesObject;
