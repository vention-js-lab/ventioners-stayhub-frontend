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
  profileContainer: {
    display: 'flex',
    gap: {
      xs: '8px',
      md: '26px',
    },
    alignItems: 'start',
    textAlign: 'start',
    mx: 'auto',
    marginTop: '64px',
    marginBottom: '56px',
    maxWidth: '90%',
  },
  headingContainer: {
    minWidth: 0,
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
  },
  firstName: {
    marginTop: '18px',
    marginBottom: '6px',
    fontWeight: 600,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
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
  email: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
} satisfies MuiStylesObject;
