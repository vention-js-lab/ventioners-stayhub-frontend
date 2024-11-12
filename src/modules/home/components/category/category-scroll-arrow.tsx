import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import IconButton from '@mui/material/IconButton';
import { categoryScrollArrowStyles } from './category-scroll-arrow.styles';

type CategoryScrollArrowProps = { onClick: () => void; direction: 'left' | 'right' };

export function CategoryScrollArrow({ onClick, direction }: CategoryScrollArrowProps) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        ...categoryScrollArrowStyles.arrowButton,
        [direction]: 0,
      }}
    >
      {direction === 'right' ? <NavigateNextIcon /> : <NavigateBeforeIcon />}
    </IconButton>
  );
}
