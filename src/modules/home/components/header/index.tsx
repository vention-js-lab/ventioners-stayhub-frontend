import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';
import { useState } from 'react';
import { NavButton } from '../../styles';
import fullLogo from '#/assets/logo-full.svg';
import logo from '#/assets/logo.svg';
import { UserNavigationMenu } from './user-navigation.menu';
import { SearchBar } from './search-bar';

interface HeaderComponentProps {
  setSelectedLocation?: (newState: string) => void;
  showStaysAndExperiences?: boolean;
  showSearchBar?: boolean;
}

export function HeaderComponent({ setSelectedLocation, showStaysAndExperiences, showSearchBar }: HeaderComponentProps) {
  const theme = useTheme();
  const isMediumDown = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeNav, setActiveNav] = useState<'stays' | 'experiences'>('stays');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="default" elevation={0} sx={{ backgroundColor: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', height: 80, position: 'relative' }}>
          <Button
            sx={{
              right: 100,
              position: 'relative',
              '&:hover': { backgroundColor: 'white' },
              minWidth: isMediumDown ? 60 : 'auto',
            }}
            disableRipple={true}
            href="/"
          >
            <img
              src={isMediumDown ? logo : fullLogo}
              alt="Logo"
              style={{
                height: isMediumDown ? 42 : 55,
                width: 'auto',
              }}
            />
          </Button>

          {showStaysAndExperiences ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <NavButton active={(activeNav === 'stays').toString()} onClick={() => setActiveNav('stays')}>
                <Typography sx={{ fontWeight: activeNav === 'stays' ? 600 : 500 }}>Stays</Typography>
              </NavButton>
              <NavButton active={(activeNav === 'experiences').toString()} onClick={() => setActiveNav('experiences')}>
                <Typography sx={{ fontWeight: activeNav === 'experiences' ? 600 : 500 }}>Experiences</Typography>
              </NavButton>
            </Box>
          ) : null}

          <UserNavigationMenu anchorEl={anchorEl} handleMenuClose={handleMenuClose} handleMenuOpen={handleMenuOpen} />

          {showSearchBar && setSelectedLocation ? (
            <SearchBar setSelectedLocation={setSelectedLocation} activeNav={activeNav} />
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
