import Typography from '@mui/material/Typography';
import { type CategoryWithIcon } from '../../types/category-with-icon.type';
import Box from '@mui/material/Box';

const categoryItemContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingX: 4,
  color: 'gray',
  paddingY: 2,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    color: '#000',
    cursor: 'pointer',
  },
};

const activeItemStyles = {
  borderBottom: '2px solid #000',
  pb: 1,
  color: '#000',
};

const iconBoxStyles = {
  textAlign: 'center',
  mb: 1,
};

type CategoryItemProps = Pick<CategoryWithIcon<React.ElementType>, 'icon' | 'name'> & {
  onClick: () => void;
  isActive: boolean;
};

export function CategoryItem({ icon: Icon, name, isActive, onClick }: CategoryItemProps) {
  return (
    <Box
      sx={{
        ...categoryItemContainerStyles,
        ...(isActive && activeItemStyles),
      }}
      onClick={onClick}
    >
      <Box sx={iconBoxStyles}>
        <Icon />
      </Box>
      <Typography component="div" align="center">
        {name}
      </Typography>
    </Box>
  );
}
