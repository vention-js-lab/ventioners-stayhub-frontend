import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { UserMenu } from '../../styles';
import { LanguageModal } from './modals';
import { Language } from '../../types/enums';
import { userNavigationStyles } from './styles';
import { MenuItemLink } from './menu-item-link';
import { useAppDispatch, useAppSelector } from '#/redux/hooks';
import { ENDPOINTS as AUTH_ENDPOINTS } from '#/modules/auth/constants';
import { api } from '#/configs';
import { UserProfileIcon } from './user-profile-icon';
import { removeUser, selectAuth } from '#/redux/auth/auth-slice';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

interface MenuProps {
  anchorEl: HTMLElement | null;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
}

export function UserNavigationMenu<T extends MenuProps>({ anchorEl, handleMenuClose, handleMenuOpen }: T) {
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(Language.UZ);
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const handleLanguageIconClick = () => {
    setIsLanguageModalOpen(true);
  };

  const handleLanguageModalClose = () => {
    setIsLanguageModalOpen(false);
  };

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
  };

  async function handleLogout() {
    try {
      await api.get(AUTH_ENDPOINTS.logout);
      queryClient.invalidateQueries({ queryKey: ['auth-user'] });
      dispatch(removeUser());

      toast('Logged out successfully');
    } catch {
      toast("Couldn't log you out. Please try again");
    }

    handleMenuClose();
  }

  return (
    <Box sx={userNavigationStyles.container}>
      <Button color="inherit" sx={userNavigationStyles.stayhubYourHomeButton} href="/host/homes">
        StayHub your home
      </Button>
      <IconButton color="inherit" onClick={handleLanguageIconClick} sx={userNavigationStyles.languageIconButton}>
        <LanguageIcon sx={userNavigationStyles.languageIcon} />
      </IconButton>
      <LanguageModal
        open={isLanguageModalOpen}
        onClose={handleLanguageModalClose}
        selectedLanguage={selectedLanguage}
        onLanguageSelect={handleLanguageSelect}
      />
      <UserMenu
        variant="outlined"
        onClick={handleMenuOpen}
        startIcon={<MenuIcon sx={userNavigationStyles.menuIcon} />}
        endIcon={
          auth.user?.firstName ? (
            <UserProfileIcon firstName={auth.user.firstName} />
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
              Sign up
            </MenuItemLink>
            <MenuItemLink onClick={handleMenuClose} to="/login">
              Log in
            </MenuItemLink>
          </Box>
        )}
        {auth.loggedIn ? (
          <Box>
            <MenuItemLink onClick={handleMenuClose} to="/host/homes">
              StayHub your home
            </MenuItemLink>
            <MenuItemLink to="/wishlist" onClick={handleMenuClose}>
              Wishlist
            </MenuItemLink>
            <MenuItemLink onClick={handleMenuClose} to="/account-settings">
              Account
            </MenuItemLink>
            <MenuItemLink
              to="/"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </MenuItemLink>
          </Box>
        ) : null}
      </Menu>
    </Box>
  );
}
