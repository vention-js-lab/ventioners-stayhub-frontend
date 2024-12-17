export const userNavigationStyles = {
  container: {
    display: 'flex',
    gap: {
      xs: 0,
      sm: 2,
    },
  },
  languageIconButton: {
    '&:hover': { backgroundColor: '#F7F7F7' },
    transition: 'all 0.2s',
  },
  languageIcon: {
    width: 20,
    height: 20,
  },
  menuIcon: { width: 24, height: 24, color: '#717171' },
  accountCircleIcon: {
    width: 32,
    height: 32,
    color: '#717171',
  },
  menuContainer: {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
    elevation: 1,
  },
} as const;
