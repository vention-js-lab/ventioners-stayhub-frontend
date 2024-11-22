import IconButton from '@mui/material/IconButton';
import styled from '@mui/material/styles/styled';

export const CounterButton = styled(IconButton)(() => ({
  border: '1px solid #DDDDDD',
  borderRadius: '50%',
  width: 32,
  height: 32,
  '&.Mui-disabled': {
    border: '1px solid #EBEBEB',
    backgroundColor: 'transparent',
  },
}));
