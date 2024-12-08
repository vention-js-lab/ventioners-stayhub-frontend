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
import { UserNavigationMenu } from './user-navigation.menu';
import { SearchBar } from './search-bar';
import HomeIcon from '@mui/icons-material/Home';

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
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            height: 80,
            alignItems: 'center',
            gap: {
              md: 2,
              xs: 0,
              sm: 0,
            },
            px: { xs: 0, sm: 0 },
          }}
        >
          <Button
            sx={{
              '&:hover': { backgroundColor: 'white' },
              padding: 0,
              margin: {
                xs: 0,
                sm: 1,
              },
            }}
            disableRipple={true}
            href="/"
          >
            {isMediumDown ? (
              <HomeIcon sx={{ color: 'black', width: 'auto', margin: 0, padding: 0 }} />
            ) : (
              <img
                src={fullLogo}
                alt="Logo"
                style={{
                  height: 55,
                  textAlign: 'center',
                }}
              />
            )}
          </Button>

          {showStaysAndExperiences ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: {
                  xs: 0,
                  sm: 1,
                },
              }}
            >
              <NavButton
                active={(activeNav === 'stays').toString()}
                onClick={() => setActiveNav('stays')}
                sx={{ padding: isMediumDown ? 0 : '', width: 'auto' }}
              >
                <Typography sx={{ fontWeight: activeNav === 'stays' ? 600 : 500 }}>Stays</Typography>
              </NavButton>
              <NavButton
                active={(activeNav === 'experiences').toString()}
                onClick={() => setActiveNav('experiences')}
                sx={{ padding: isMediumDown ? 0 : '' }}
              >
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
