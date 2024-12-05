import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const deleteAccountModalStyles = {
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    padding: '32px',
    transform: 'translate(-50%, -50%)',
    height: '500px',
    width: '700px',
    borderRadius: '16px',
    backgroundColor: '#FFFFFF',
    border: '1px solid rgb(34, 34, 34)',
    boxShadow: 24,
    '@media (max-width: 743px)': {
      width: '90%',
    },
  },
  heading: {
    marginY: '24px',
    fontSize: '32px',
    fontWeight: 800,
    color: 'rgb(72, 72, 72)',
    '@media (max-width: 743px)': {
      marginTop: 0,
    },
  },
  email: {
    fontSize: '18px',
    fontWeight: '400px',
  },
  statement: {
    display: 'flex',
    marginY: '14px',
    gap: '7px',
    paddingY: '10px',
  },
  modalButton: {
    all: 'unset',
    textDecoration: 'none',
    fontSize: '16px',
    color: '#D93900',
    marginRight: '15px',
    textAlign: 'center',
    fontWeight: 500,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  submitButton: {
    all: 'unset',
    marginY: '24px',
    paddingY: '10px',
    paddingX: '22px',
    position: 'absolute',
    right: '10%',
    bottom: '10%',
    color: '#FFFFFF',
    cursor: 'pointer',
    fontWeight: 500,
    border: '2px solid rgba(0, 0, 0, 0)',
    backgroundColor: 'rgb(0, 132, 137)',
    borderRadius: '4px',
    '@media (max-width: 743px)': {
      bottom: 0,
    },
  },
} satisfies MuiStylesObject;
