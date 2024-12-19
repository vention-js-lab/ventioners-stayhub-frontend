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
  },
  titleActionBox: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    marginRight: {
      xs: 0,
      md: '16px',
    },
    marginTop: {
      xs: '8px',
      md: 0,
    },
  },
  titleActionItem: { display: 'flex', gap: '3px', alignItems: 'center', textDecoration: 'underline', cursor: 'pointer' },
  mapStyle: {
    marginBottom: '20px',
    height: {
      xs: '200px',
      sm: '300px',
      md: '450px',
    },
    marginLeft: {
      xs: '15px',
      sm: '20px',
      md: '0px',
    },
    marginRight: {
      xs: '15px',
      sm: '20px',
      md: '0px',
    },
  },
  locationText: {
    mb: '2',
    fontSize: {
      xs: '1rem',
      md: '2rem',
    },
  },
  customDivider: { my: 3, display: { xs: 'block', md: 'block' } },
  alert: { width: '90%', maxWidth: 800, marginTop: 2, marginX: 'auto' },
};
