import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { UserMenu } from '../../styles';
import { LanguageModal } from './modals';
import { userNavigationStyles } from './styles';
import { MenuItemLink } from './menu-item-link';
import { useAppDispatch, useAppSelector } from '#/redux/hooks';
import { ENDPOINTS as AUTH_ENDPOINTS } from '#/modules/auth/constants';
import { api } from '#/configs';
import { UserProfilePicture } from './user-profile-picture/user-profile-picture';
import { removeUser, selectAuth } from '#/redux/auth/auth.slice';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { useLanguage } from '#/contexts/language.context';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';

interface MenuProps {
  anchorEl: HTMLElement | null;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
}

export function UserNavigationMenu<T extends MenuProps>({ anchorEl, handleMenuClose, handleMenuOpen }: T) {
  const { t } = useTranslation('home');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const { language, changeLanguage } = useLanguage();
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const handleLanguageIconClick = () => {
    setIsLanguageModalOpen(true);
  };

  const handleLanguageModalClose = () => {
    setIsLanguageModalOpen(false);
  };

  const handleLanguageSelect = (lng: string) => {
    changeLanguage(lng);
  };

  async function handleLogout() {
    try {
      await api.get(AUTH_ENDPOINTS.logout);
      queryClient.invalidateQueries({ queryKey: ['auth-user'] });
      dispatch(removeUser());

      toast(t(TRANSLATION_KEYS.home.header.nav.logout_success));

      window.location.href = '/';
    } catch {
      toast("Couldn't log you out. Please try again");
    }

    handleMenuClose();
  }

  return (
    <Box sx={userNavigationStyles.container}>
      <IconButton color="inherit" onClick={handleLanguageIconClick} sx={userNavigationStyles.languageIconButton}>
        <LanguageIcon sx={userNavigationStyles.languageIcon} />
      </IconButton>
      <LanguageModal
        open={isLanguageModalOpen}
        onClose={handleLanguageModalClose}
        selectedLanguage={language}
        onLanguageSelect={handleLanguageSelect}
      />
      <UserMenu
        variant="outlined"
        onClick={handleMenuOpen}
        startIcon={<MenuIcon sx={userNavigationStyles.menuIcon} />}
        endIcon={
          auth.user?.firstName ? (
            <UserProfilePicture user={auth.user} size="small" />
          ) : (
            <AccountCircle sx={userNavigationStyles.accountCircleIcon} />
          )
        }
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={userNavigationStyles.menuContainer.anchorOrigin}
        transformOrigin={userNavigationStyles.menuContainer.transformOrigin}
        elevation={userNavigationStyles.menuContainer.elevation}
      >
        {!auth.loggedIn && (
          <Box>
            <MenuItemLink onClick={handleMenuClose} to="/signup">
              {t(TRANSLATION_KEYS.home.header.nav.sign_up)}
            </MenuItemLink>
            <MenuItemLink onClick={handleMenuClose} to="/login">
              {t(TRANSLATION_KEYS.home.header.nav.login)}
            </MenuItemLink>
          </Box>
        )}
        {auth.loggedIn ? (
          <Box>
            <MenuItemLink onClick={handleMenuClose} to="/host/homes">
              {t(TRANSLATION_KEYS.home.header.nav.stayhub_home)}
            </MenuItemLink>
            <MenuItemLink onClick={handleMenuClose} to="/owner/properties">
              {t(TRANSLATION_KEYS.home.header.nav.my_properties)}
            </MenuItemLink>
            <MenuItemLink onClick={handleMenuClose} to="/bookings">
              {t(TRANSLATION_KEYS.home.header.nav.bookings)}
            </MenuItemLink>
            <MenuItemLink to="/wishlist" onClick={handleMenuClose}>
              {t(TRANSLATION_KEYS.home.header.nav.wishlist)}
            </MenuItemLink>
            <MenuItemLink onClick={handleMenuClose} to="/account-settings">
              {t(TRANSLATION_KEYS.home.header.nav.account)}
            </MenuItemLink>
            <MenuItemLink
              to="/"
              onClick={() => {
                handleLogout();
              }}
            >
              {t(TRANSLATION_KEYS.home.header.nav.logout)}
            </MenuItemLink>
          </Box>
        ) : null}
      </Menu>
    </Box>
  );
}
