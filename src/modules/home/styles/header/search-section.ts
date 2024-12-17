import Button from '@mui/material/Button';
import styled from '@mui/material/styles/styled';

export const SearchSection = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: 50,
  padding: '8px 15px',
  height: '100%',
  color: '#222222',
  backgroundColor: 'transparent',
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  '&:hover': {
    backgroundColor: '#F7F7F7',
  },
  '& .MuiStack-root': {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  [theme.breakpoints.down('md')]: {
    padding: '8px 16px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0px 4px',
  },
}));
