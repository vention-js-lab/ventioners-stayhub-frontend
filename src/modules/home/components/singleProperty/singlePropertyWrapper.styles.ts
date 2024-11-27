export const singlePropertyStyles = {
  mainBox: { height: '60vh', display: 'flex', gap: '10px', borderRadius: '15px', overflow: 'hidden', position: 'relative' },
  imageBox: {
    width: { xs: '100%', md: '50%' },
    height: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    boxSizing: 'border-box',
  },
  viewMoreLink: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    textDecoration: 'none',
    color: '#000',
    borderRadius: '5px',
    border: '1px solid #000',
    backgroundColor: 'white',
    padding: '5px 10px',
  },
} as const;
