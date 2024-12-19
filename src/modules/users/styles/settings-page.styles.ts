import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const settingsPageStyles = {
  container: {
    paddingTop: '12px',
    marginX: 'auto',
    textAlign: 'center',
    maxWidth: {
      xs: '100%',
      lg: '1080px',
    },
    width: {
      xs: '100%',
      lg: '1080px',
    },
  },
  headingContainer: {
    display: 'flex',
    gap: {
      xs: '16px',
      md: '30px',
    },
    alignItems: 'start',
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
    marginTop: '8px',
    marginBottom: '16px',
    fontSize: {
      xs: '16px',
      md: 'inherit',
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
