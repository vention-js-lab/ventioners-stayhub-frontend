export const googleAuthButtonStyles = {
  wrapper: {
    marginBottom: '16px',
    width: '100%',
    height: '48px',
    border: '1px solid rgb(34, 34, 34)',
    borderRadius: '8px',
    cursor: 'pointer',
    padding: '13px 23px',
    background: 'white',
    '&:hover': {
      background: '#f7f7f7',
    },
  },

  container: {
    all: 'unset',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '14px',
  },

  logo: {
    display: 'block',
    height: '20px',
    width: '20px',
  },

  text: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',

    textAlign: 'center',
    fontWeight: 600,
  },
} as const;
