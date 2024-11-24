export const propertyListStyles = {
  container: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
      lg: 'repeat(4, 1fr)',
    },
    gap: { xs: 2, sm: 3, md: 4 },
    px: { xs: 1, sm: 2, md: 3 },
    py: { xs: 2, sm: 3, md: 4 },
  },
  emptyMessage: {
    px: { xs: 1, sm: 2, md: 3 },
  },
  loadingMessage: {
    px: { xs: 1, sm: 2, md: 3 },
  },
};
