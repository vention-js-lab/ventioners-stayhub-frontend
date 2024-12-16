export const createAccommodationStyles = {
  container: {
    maxWidth: 800,
    margin: 'auto',
    padding: 3,
  },
  stepper: {
    marginBottom: '20px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 3,
  },
  button: {
    minWidth: 120,
  },
  gridContainer: {
    marginTop: 2,
  },
  categoryCard: (isSelected: boolean) => ({
    cursor: 'pointer',
    border: isSelected ? '2px solid #FF385C' : '1px solid #ddd',
    transition: 'all 0.3s ease',
  }),
  imageUploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  },
  imageGrid: {
    marginTop: 2,
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 2,
  },
};
