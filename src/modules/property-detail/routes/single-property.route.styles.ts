export const singlePropertyStyles = {
  mainContainer: { display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1240px', margin: 'auto' },
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
  titleActionBox: { display: 'flex', gap: '10px', alignItems: 'center', marginRight: '16px' },
  titleActionItem: { display: 'flex', gap: '3px', alignItems: 'center', textDecoration: 'underline', cursor: 'pointer' },
  mapStyle: { height: '450px', marginBottom: '40px' },
};
