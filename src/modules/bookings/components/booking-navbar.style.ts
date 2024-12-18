import { type SxProps, type Theme } from '@mui/material/styles';

export const navStyles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '18px',
  },
  header: {
    mb: 5,
    fontWeight: 300,
    textAlign: 'center',
  },
  menuStyles: {
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    backgroundColor: 'black',
  },
  navItem: (isSelected: boolean): SxProps<Theme> => ({
    width: '100%',
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: '500',
    padding: '10px 5px',
    cursor: 'pointer',
    transform: isSelected ? 'scale(1.3)' : 'scale(1)',
    color: isSelected ? '#E91E63' : '#000',
    transition: 'transform 0.4s ease, color 0.4s ease',
    '&:hover': {
      transform: 'scale(1.3)',
    },
  }),
};
