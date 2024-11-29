import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const securityFormStyles = {
  container: {
    paddingTop: '12px',
    paddingLeft: '12px',
    marginX: 'auto',
    maxWidth: '1080px',
    width: '1080px',
    '@media (max-width: 1080px)': {
      maxWidth: '100%',
      width: '100%',
    },
  },
  breadcrumbs: {
    color: '#484848',
    fontWeight: 600,
    fontSize: '0.875rem',
  },
  heading: {
    marginTop: '12px',
    fontSize: '2rem',
    fontWeight: 800,
    color: 'rgb(72, 72, 72)',
    textAlign: 'start',
    marginBottom: '40px',
  },
  nameContainer: {
    marginBottom: '16px',
  },
  label: {
    textAlign: 'start',
    fontWeight: 500,
    paddingTop: '24px',
    paddingBottom: '12px',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: 'start',
  },
  button: {
    all: 'unset',
    backgroundColor: '#242424',
    paddingX: '24px',
    paddingY: '14px',
    borderRadius: '8px',
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 500,
    marginTop: '28px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#000000',
    },
  },
} satisfies MuiStylesObject;
