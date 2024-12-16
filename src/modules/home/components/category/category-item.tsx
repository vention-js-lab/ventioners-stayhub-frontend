import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { categoryStyles } from './category-item.styles';
import { IconWrapper } from '../icon/icon-wrapper';
import { type IconComponent } from '../../types/icon.type';
import { useLanguage } from '#/contexts/language.context';

type CategoryItemProps = {
  icon: IconComponent;
  name: string;
  name_ru: string;
  onClick: () => void;
  isActive: boolean;
};

export function CategoryItem({ icon: Icon, name, name_ru, isActive, onClick }: CategoryItemProps) {
  const { language } = useLanguage();

  return (
    <Box
      sx={{
        ...categoryStyles.categoryItemContainer,
        ...(isActive && categoryStyles.activeItem),
      }}
      onClick={onClick}
    >
      <Box sx={categoryStyles.iconBox}>
        <IconWrapper icon={Icon} />
      </Box>
      <Typography component="div" align="center" fontSize={15}>
        {language === 'en' ? name : name_ru}
      </Typography>
    </Box>
  );
}
