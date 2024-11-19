import { Styles } from '#/modules/auth/constants';

export const loginFormStyles = {
  wrapper: {
    border: Styles.primaryBorderColor,
    borderRadius: '8px',
  },

  dividerContainer: {
    width: '100%',
    marginBottom: '16px',
    fontWeight: Styles.boldFont,
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
