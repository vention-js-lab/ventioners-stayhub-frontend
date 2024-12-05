import { Fragment } from 'react/jsx-runtime';
import { HeaderComponent } from '#/modules/home/components/header';
import { SettingsCard } from '../components';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import personalInfoIcon from '#/assets/info-card.svg';
import securityShieldIcon from '#/assets/security-shield.svg';
import togglesIcon from '#/assets/toggles.svg';
import { settingsPageStyles as styles } from '../styles/settings-page.styles';
import { useAppSelector } from '#/redux/hooks';
import { selectAuth } from '#/redux/auth/auth-slice';
import { UserProfilePicture } from '#/modules/home/components/header/user-profile-picture/user-profile-picture';

export function ProfileRoute() {
  const auth = useAppSelector(selectAuth);

  return (
    <Fragment>
      <HeaderComponent />
      <Box sx={styles.container}>
        <Box sx={styles.headingContainer}>
          <Box>
            {auth.user?.firstName ? (
              <UserProfilePicture user={auth.user} size="large" />
            ) : (
              <AccountCircle sx={styles.noProfileIcon} />
            )}
          </Box>
          <Box>
            <Box sx={styles.heading}>Your Profile</Box>
            <Box sx={styles.headingDetails}>
              <Box sx={styles.firstName}>
                {auth.user?.firstName} {auth.user?.lastName}
              </Box>
              <Box>{auth.user?.email}</Box>
            </Box>
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
