import Button from '@mui/material/Button';
import styled from '@mui/material/styles/styled';

export const NavButton = styled(Button)(({ active }: { active?: boolean }) => ({
  textTransform: 'none',
  color: active ? '#222222' : '#717171',
  borderBottom: 'none',
  borderRadius: 0,
  padding: '10px 16px',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: active ? 'none' : '#F7F7F7',
    borderRadius: 50,
    color: active ? 'none' : '#222222',
  },
}));
