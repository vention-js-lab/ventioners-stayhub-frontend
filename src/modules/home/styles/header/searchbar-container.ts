import Paper from '@mui/material/Paper';
import styled from '@mui/material/styles/styled';

export const SearchbarContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderRadius: 40,
  border: '1px solid #DDDDDD',
  padding: '8px 8px',
  backgroundColor: 'white',
  position: 'absolute',
  bottom: -65,
  left: '50%',
  transform: 'translateX(-50%)',
  '&:hover': {
    boxShadow: '0 2px 4px rgba(0,0,0,0.18)',
  },
  [theme.breakpoints.down('md')]: {
    width: '80%',
  },
  [theme.breakpoints.up('md')]: {
    width: 'auto',
  },
}));
