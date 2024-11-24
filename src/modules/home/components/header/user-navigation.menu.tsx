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

interface MenuProps {
  anchorEl: HTMLElement | null;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
}

export function UserNavigationMenu<T extends MenuProps>({ anchorEl, handleMenuClose, handleMenuOpen }: T) {
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(Language.UZ);

  const handleLanguageIconClick = () => {
    setIsLanguageModalOpen(true);
  };

  const handleLanguageModalClose = () => {
    setIsLanguageModalOpen(false);
  };

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
  };

  return (
    <Box sx={userNavigationStyles.container}>
      <Button color="inherit" sx={userNavigationStyles.airBnbYourHomeButton} href="/host/homes">
        Airbnb your home
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
        endIcon={<AccountCircle sx={userNavigationStyles.accountCircleIcon} />}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={userNavigationStyles.menuContainer.anchorOrigin}
        transformOrigin={userNavigationStyles.menuContainer.transformOrigin}
        elevation={userNavigationStyles.menuContainer.elevation}
      >
        <MenuItemLink onClick={handleMenuClose} to="/signup">
          Sign up
        </MenuItemLink>
        <MenuItemLink onClick={handleMenuClose} to="/login" sx={{ borderBottom: '1px solid #DDDDDD' }}>
          Log in
        </MenuItemLink>
        <MenuItemLink to="/wishlist" onClick={handleMenuClose}>
          Wishlist
        </MenuItemLink>
        <MenuItemLink onClick={handleMenuClose} to="/giftcards">
          Gift cards
        </MenuItemLink>
        <MenuItemLink onClick={handleMenuClose} to="/host/homes">
          Airbnb your home
        </MenuItemLink>
        <MenuItemLink onClick={handleMenuClose} to="/host/experiences">
          Host experience
        </MenuItemLink>
        <MenuItemLink onClick={handleMenuClose} to="/help">
          Help center
        </MenuItemLink>
      </Menu>
    </Box>
  );
}
