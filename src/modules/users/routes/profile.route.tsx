import { Fragment } from 'react/jsx-runtime';
import { HeaderComponent } from '#/modules/home/components/header';
import { SettingsCard } from '../components';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import personalInfoIcon from '#/assets/info-card.svg';
import securityShieldIcon from '#/assets/security-shield.svg';
import { settingsPageStyles as styles } from '../styles/settings-page.styles';
import { useAppSelector } from '#/redux/hooks';
import { selectAuth } from '#/redux/auth/auth.slice';
import { UserProfilePicture } from '#/modules/home/components/header/user-profile-picture/user-profile-picture';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';

export function ProfileRoute() {
  const { t } = useTranslation('account-settings');
  const auth = useAppSelector(selectAuth);

  return (
    <Fragment>
      <HeaderComponent />
      <Box sx={styles.container}>
        <Box sx={styles.profileContainer}>
          <Box>
            {auth.user?.firstName ? (
              <UserProfilePicture user={auth.user} size="large" />
            ) : (
              <AccountCircle sx={styles.noProfileIcon} />
            )}
          </Box>
          <Box sx={styles.headingContainer}>
            <Box sx={styles.heading}>{t(TRANSLATION_KEYS.account_settings.your_profile)}</Box>
            <Box sx={styles.headingDetails}>
              <Box sx={styles.firstName}>
                {auth.user?.firstName} {auth.user?.lastName}
              </Box>
              <Box sx={styles.email}>{auth.user?.email}</Box>
            </Box>
          </Box>
        </Box>

        <Box sx={styles.grid}>
          <SettingsCard
            icon={personalInfoIcon}
            title={t(TRANSLATION_KEYS.account_settings.personal_info.title) as 'Personal info'}
            description={t(TRANSLATION_KEYS.account_settings.personal_info.description)}
          />
          <SettingsCard
            icon={securityShieldIcon}
            title={t(TRANSLATION_KEYS.account_settings.login_security.title) as 'Login & security'}
            description={t(TRANSLATION_KEYS.account_settings.login_security.description)}
          />
        </Box>
      </Box>
    </Fragment>
  );
}
