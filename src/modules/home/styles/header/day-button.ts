import Box from '@mui/material/Box';
import styled from '@mui/material/styles/styled';

export const DayButton = styled(Box, {
  shouldForwardProp: (prop) => !['isSelected', 'isToday', 'isCurrentMonth', 'isInRange'].includes(prop as string),
})<{
  isSelected?: boolean;
  isToday?: boolean;
  isCurrentMonth?: boolean;
  isInRange?: boolean;
}>(({ isSelected, isToday, isCurrentMonth, isInRange }) => ({
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  borderRadius: '50%',
  backgroundColor: isSelected ? '#000' : isInRange ? '#f5f5f5' : 'transparent',
  color: isSelected ? '#fff' : isCurrentMonth ? '#000' : '#ccc',
  border: isToday ? '1px solid #000' : 'none',
  '&:hover': {
    backgroundColor: isSelected ? '#000' : '#f5f5f5',
  },
}));
