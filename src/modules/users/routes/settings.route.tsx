import { Fragment } from 'react/jsx-runtime';
import { HeaderComponent } from '#/modules/home/components/header';
import { SettingsCard } from '../components';
import { ROUTES } from '../constants';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import personalInfoIcon from '#/assets/info-card.svg';
import securityShieldIcon from '#/assets/security-shield.svg';
import togglesIcon from '#/assets/toggles.svg';
import { settingsPageStyles as styles } from '../styles/settings-page.styles';
import { useAppSelector } from '#/redux/hooks';
import { selectAuth } from '#/redux/auth/auth-slice';

export function SettingsRoute() {
  const auth = useAppSelector(selectAuth);

  return (
    <Fragment>
      <HeaderComponent />
      <Box sx={styles.container}>
        <Box sx={styles.headingContainer}>
          <Box sx={styles.heading}>Account</Box>
          <Box sx={styles.headingDetails}>
            <Box sx={styles.firstName}>{auth.user?.firstName}</Box>, {auth.user?.email} ·&nbsp;
            <Link href={ROUTES.profile} sx={styles.profileRef}>
              Go to profile
            </Link>
          </Box>
        </Box>

        <Box sx={styles.grid}>
          <SettingsCard
            icon={personalInfoIcon}
            title="Personal info"
            description="Provide personal details and how we can reach you"
          />
          <SettingsCard
            icon={securityShieldIcon}
            title="Login & security"
            description="Update your password and secure your account"
          />
          <SettingsCard icon={togglesIcon} title="Global preferences" description="Set your default language" />
        </Box>
      </Box>
    </Fragment>
  );
}
