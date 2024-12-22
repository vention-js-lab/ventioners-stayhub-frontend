import { type SxProps, type Theme } from '@mui/material/styles';

export const navStyles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '18px',
  },
  header: {
    mb: 5,
    fontWeight: 500,
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
    padding: '10px 5px',
    cursor: 'pointer',
    color: isSelected ? '#E91E63' : '#000',
    fontWeight: isSelected ? 700 : 500,
    transition: 'transform 0.3s ease',
  }),
};
