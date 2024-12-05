import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export function userProfilePictureStyles(size: 'small' | 'large' = 'small', profilePictureUrl: string | null = null) {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyItems: 'center',
      alignItems: 'center',
      position: 'relative',
      marginRight: '5px',
    },

    image: {
      width: '32px',
      height: '32px',
      backgroundColor: '#000000',
      color: '#ffffff',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid rgb(235, 235, 235)',
      ...(size === 'large' && {
        width: '200px',
        height: '200px',
        '@media (max-width: 450px)': {
          width: '120px',
          height: '120px',
        },
      }),
      ...(profilePictureUrl && {
        backgroundImage: `url(${profilePictureUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }),
    },
    text: {
      fontSize: '15px',
      fontWeight: '400',
      textTransform: 'uppercase',
      ...(size === 'large' && { fontSize: '32px' }),
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
}
