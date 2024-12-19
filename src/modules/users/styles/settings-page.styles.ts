import { type MuiStylesObject } from '#/types/mui-styles-object.type';

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
    display: 'flex',
    gap: '30px',
    alignItems: 'start',
    textAlign: 'start',
    marginLeft: '16px',
    marginTop: '64px',
    marginBottom: '56px',
    '@media (max-width: 768px)': {
      gap: '16px',
    },
  },
  heading: {
    fontSize: '2rem',
    width: '100%',
    lineHeight: '2.25rem',
    fontWeight: 600,
  },
  headingDetails: {
    marginTop: '8px',
    marginBottom: '16px',
    '@media (max-width: 768px)': {
      fontSize: '16px',
    },
  },
  firstName: {
    marginTop: '18px',
    marginBottom: '6px',
    fontWeight: 600,
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingX: '12px',
  },
  noProfileIcon: {
    width: 32,
    height: 32,
    color: '#717171',
    marginRight: '5px',
  },
} satisfies MuiStylesObject;
