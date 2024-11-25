import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const headerStyles = {
  appBar: {
    backgroundColor: '#ffffff',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    height: '80px',
    justifyContent: 'center',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '0 24px',
    minHeight: '80px !important',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#ff385c',
    '&:hover': {
      color: '#d70466',
    },
    height: '10px',
    padding: '0',
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    padding: '24px 0',
  },
  logoText: {
    fontWeight: 600,
    fontSize: '24px',
    color: 'inherit',
    '&:hover': {
      color: '#d70466',
    },
  },
  logoImage: {
    width: 'auto',
    height: '62px',
    objectFit: 'contain',
  },
} satisfies MuiStylesObject;
