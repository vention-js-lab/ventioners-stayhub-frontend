import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import IconButton from '@mui/material/IconButton';

const arrowButtonStyles = {
  display: { xs: 'none', sm: 'flex' },
  border: '1px solid #DDDDDD',
  borderRadius: '50%',
  p: 1,
  backgroundColor: '#fff',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    cursor: 'pointer',
  },
  position: 'absolute',
  zIndex: 2,
};

type CategoryScrollArrowProps = { onClick: () => void; direction: 'left' | 'right' };

export function CategoryScrollArrow({ onClick, direction }: CategoryScrollArrowProps) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        ...arrowButtonStyles,
        [direction]: 0,
      }}
    >
      {direction === 'right' ? <NavigateNextIcon /> : <NavigateBeforeIcon />}
    </IconButton>
  );
}
