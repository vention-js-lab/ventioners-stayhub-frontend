import Typography from '@mui/material/Typography';
import { type CategoryWithIcon } from '../../types/category-with-icon.type';
import Box from '@mui/material/Box';
import { categoryStyles } from './category-item.styles';

type CategoryItemProps = Pick<CategoryWithIcon<React.ElementType>, 'icon' | 'name'> & {
  onClick: () => void;
  isActive: boolean;
};

export function CategoryItem({ icon: Icon, name, isActive, onClick }: CategoryItemProps) {
  return (
    <Box
      sx={{
        ...categoryStyles.categoryItemContainer,
        ...(isActive && categoryStyles.activeItem),
      }}
      onClick={onClick}
    >
      <Box sx={categoryStyles.iconBox}>
        <Icon />
      </Box>
      <Typography component="div" align="center">
        {name}
      </Typography>
    </Box>
  );
}
