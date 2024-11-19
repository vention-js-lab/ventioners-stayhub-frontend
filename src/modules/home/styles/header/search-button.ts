import Button from '@mui/material/Button';
import styled from '@mui/material/styles/styled';

export const SearchButton = styled(Button)(() => ({
  minWidth: '40px',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#FF385C',
  color: 'white',
  flexShrink: 0,
  '&:hover': {
    backgroundColor: '#D70466',
  },
}));
