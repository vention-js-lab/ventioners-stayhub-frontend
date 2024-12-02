import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ROUTES } from '#/modules/users/constants';
import { settingsCardStyles as styles } from './settings-card.styles';

type Props = {
  icon: string;
  title: string;
  description: string;
};

const maps = {
  'Personal info': ROUTES.personalInfo,
  'Login & security': ROUTES.loginAndSecurity,
  'Global preferences': ROUTES.preferences,
};

export function SettingsCard({ icon, title, description }: Props) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(maps[title as keyof typeof maps]);
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
