import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const emailVerificationStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    padding: '0 16px',
  },
  paper: {
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '500px',
    borderRadius: '12px',
  },
  icon: {
    fontSize: '100px',
    marginBottom: '20px',
  },
  button: {
    marginTop: '20px',
  },
} satisfies MuiStylesObject;
