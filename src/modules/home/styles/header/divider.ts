import Divider from '@mui/material/Divider';
import styled from '@mui/material/styles/styled';

export const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: '0 -4px',
  height: '24px',
  alignSelf: 'center',
  backgroundColor: '#DDDDDD',
  [theme.breakpoints.down('sm')]: {
    height: '20px',
  },
}));
