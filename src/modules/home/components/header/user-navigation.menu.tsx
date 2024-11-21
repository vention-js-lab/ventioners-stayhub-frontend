import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { UserMenu } from '../../styles';
import { LanguageModal } from './modals';
import { Language } from '../../types/enums';
import { userNavigationStyles } from './styles';

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
        <MenuItem onClick={handleMenuClose} href="/signup_login">
          Sign up
        </MenuItem>
        <MenuItem onClick={handleMenuClose} href="/login" sx={{ borderBottom: '1px solid #DDDDDD' }}>
          Log in
        </MenuItem>
        <MenuItem onClick={handleMenuClose} href="/giftcards">
          Gift cards
        </MenuItem>
        <MenuItem onClick={handleMenuClose} href="/host/homes">
          Airbnb your home
        </MenuItem>
        <MenuItem onClick={handleMenuClose} href="/host/experiences">
          Host experience
        </MenuItem>
        <MenuItem onClick={handleMenuClose} href="/help">
          Help center
        </MenuItem>
      </Menu>
    </Box>
  );
}
