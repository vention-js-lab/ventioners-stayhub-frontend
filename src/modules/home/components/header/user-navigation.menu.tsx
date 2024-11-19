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

interface MenuProps {
  anchorEl: HTMLElement | null;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
}

export function UserNavigationMenu<T extends MenuProps>({ anchorEl, handleMenuClose, handleMenuOpen }: T) {
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('uz');

  const handleLanguageIconClick = () => {
    setIsLanguageModalOpen(true);
  };

  const handleLanguageModalClose = () => {
    setIsLanguageModalOpen(false);
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button
        color="inherit"
        sx={{
          borderRadius: 20,
          '&:hover': { backgroundColor: '#F7F7F7' },
          fontFamily: 'sans-serif',
          textTransform: 'none',
          fontSize: '',
        }}
        href="/host/homes"
      >
        Airbnb your home
      </Button>

      <IconButton
        color="inherit"
        onClick={handleLanguageIconClick}
        sx={{
          '&:hover': { backgroundColor: '#F7F7F7' },
          transition: 'all 0.2s',
        }}
      >
        <LanguageIcon sx={{ width: 20, height: 20 }} />
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
        startIcon={<MenuIcon sx={{ width: 24, height: 24, color: '#717171' }} />}
        endIcon={<AccountCircle sx={{ width: 32, height: 32, color: '#717171' }} />}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        elevation={1}
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
