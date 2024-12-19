export const singlePropertyStyles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '1240px',
    margin: 'auto',
    marginBottom: '60px',
  },
  titleBox: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  titleText: {
    fontSize: {
      xs: '1.5rem',
      sm: '2rem',
      md: '2.5rem',
    },
    fontWeight: 600,
    textAlign: 'left',
    my: '16px',
    mx: { md: 0, xs: '16px' },
    '@media (max-width: 768px)': {
      fontSize: '1.2rem',
    },
  },
  titleActionBox: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    marginRight: '16px',
    '@media (max-width: 768px)': {
      marginRight: '0',
      marginTop: '8px',
    },
  },
  titleActionItem: { display: 'flex', gap: '3px', alignItems: 'center', textDecoration: 'underline', cursor: 'pointer' },
  mapStyle: {
    height: '450px',
    margin: '20px',
    '@media (max-width: 768px)': {
      height: '300px',
    },
    '@media (max-width: 480px)': {
      height: '200px',
    },
  },
  locationText: {
    mb: '2',
    fontSize: '2rem',
    '@media (max-width: 768px)': {
      fontSize: '1rem',
    },
  },
  customDivider: { my: 3, display: { md: 'none', xs: 'block' } },
};
