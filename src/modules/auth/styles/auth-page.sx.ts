export const authPageStyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '12px',
    textAlign: 'center',
  },
  wrapper: {
    border: '1px solid rgb(176, 176, 176)',
    borderRadius: '12px',
    marginTop: '32px',
    marginBottom: '32px',
    maxWidth: '566px',
    width: '566px',
    '@media (max-width: 743px)': {
      border: 'none',
      maxWidth: '100%',
      width: '100%',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '24px',
    paddingRight: '24px',
    minHeight: '64px',
    borderBottom: '1px solid rgb(235, 235, 235)',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  main: {
    padding: '32px',
  },
  heading: {
    marginBottom: '24px',
    marginTop: '8px',
    fontSize: '1.375rem',
    textAlign: 'left',
    fontWeight: 'bold',
  },
} as const;
