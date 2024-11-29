export const settingsPageStyles = {
  container: {
    paddingTop: '12px',
    marginX: 'auto',
    textAlign: 'center',
    maxWidth: '1080px',
    width: '1080px',
    '@media (max-width: 1080px)': {
      maxWidth: '100%',
      width: '100%',
    },
  },
  headingContainer: {
    textAlign: 'start',
    marginLeft: '16px',
    marginTop: '64px',
    marginBottom: '56px',
  },
  heading: {
    fontSize: '2rem',
    width: '100%',
    lineHeight: '2.25rem',
    fontWeight: 600,
  },
  headingDetails: {
    display: 'flex',
    marginTop: '8px',
    marginBottom: '16px',
    fontSize: '18px',
  },
  firstName: {
    fontWeight: 600,
  },
  profileRef: {
    all: 'unset',
    textDecoration: 'underline',
    color: '#000000',
    fontWeight: 600,
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingX: '12px',
  },
} as const;
