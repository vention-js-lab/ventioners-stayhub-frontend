export const signupFormStyles = {
  wrapper: {
    border: '1px solid rgb(176, 176, 176)',
    borderRadius: '8px',
    '&:nth-of-type(1)': {
      marginBottom: '26px',
    },
  },

  dividerContainer: {
    width: '100%',
    marginBottom: '16px',
    fontWeight: 500,
    fontSize: '0.8rem',
  },

  divider: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',

    '&::before': {
      content: "''",
      display: 'block',
      width: '100%',
      height: '1px',
      backgroundColor: '#dddddd',
      marginRight: '16px',
    },

    '&::after': {
      content: "''",
      display: 'block',
      width: '100%',
      height: '1px',
      backgroundColor: '#dddddd',
      marginLeft: '16px',
    },
  },
} as const;
