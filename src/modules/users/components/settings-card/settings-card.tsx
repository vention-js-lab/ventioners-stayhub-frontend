import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ROUTES } from '#/modules/users/constants';
import { settingsCardStyles as styles } from './settings-card.styles';

type Props = {
  icon: string;
  title: keyof typeof maps;
  description: string;
};

const maps = {
  'Personal info': ROUTES.personalInfo,
  'Login & security': ROUTES.loginAndSecurity,
};

const langMap: Record<string, keyof typeof maps> = {
  'Личные данные': 'Personal info',
  'Вход и безопасность': 'Login & security',
};

export function SettingsCard({ icon, title, description }: Props) {
  const navigate = useNavigate();

  function handleClick() {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const navigateTo = langMap[title] || title;

    navigate(maps[navigateTo]);
  }

  return (
    <Button sx={styles.container} disableRipple={true} onClick={handleClick}>
      <Box sx={styles.card}>
        <Box sx={styles.iconContainer}>
          <img src={icon} width={32} height={32} />
        </Box>
        <Box>
          <Box sx={styles.title}>{title}</Box>
          <Box sx={styles.description}>{description}</Box>
        </Box>
      </Box>
    </Button>
  );
}
