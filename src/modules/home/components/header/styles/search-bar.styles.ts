export const searchbarStyles = {
  searchbarContainer: {
    elevation: 2,
    styles: {
      width: { xs: '98%', sm: '95%', md: '90%', lg: '70%' },
      height: '4.5rem',
      maxWidth: '850px',
      transition: 'all 0.3s ease',
    },
  },
  stack: {
    direction: 'row',
    spacing: { xs: 1, sm: 2 },
    styles: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      padding: { xs: '0 4px', sm: '0 8px' },
    },
  },

  searchSection: {
    container: {
      flex: 1,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    popover: {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'left',
      },
      paperProps: {
        width: '300px',
        mt: 1,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      },
      searchDestionationsTextField: {
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.1)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.2)',
          },
        },
      },
      list: { maxHeight: '300px', overflow: 'auto' },
      listItem: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
      },
      listItemText: {
        primary: {
          fontSize: '0.9rem',
          fontWeight: 500,
        },
        secondary: {
          fontSize: '0.8rem',
        },
      },
    },
  },

  datesSection: {
    desktopDates: {
      textAlign: 'center',
      minWidth: '275px',
      '@media (max-width: 786px)': {
        display: 'none',
      },
    },
    mobileDates: {
      display: 'none',
      '@media (max-width: 786px)': {
        display: 'flex',
        width: '100%',
        height: '100%',
      },
    },
    container: {
      display: 'flex',
      flex: { xs: 1, sm: 2 },
      gap: { xs: 1, sm: 2 },
      height: '100%',
      alignItems: 'center',
    },
    checkInOutStack: {
      direction: 'row',
      spacing: { xs: 1, sm: 2 },
      styles: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    commonDisplay: {
      flex: 1,
    },
    commonWidth: {
      width: '100%',
    },
  },

  searchButtonContainer: {
    width: '100%',
  },
  searchButton: {
    width: { xs: '2.5rem', sm: '3rem' },
    height: { xs: '2.5rem', sm: '3rem' },
    minWidth: { xs: '2.5rem', sm: '3rem' },
    margin: 'auto 0',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  searchIcon: {
    fontSize: { xs: 18, sm: 22 },
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'rotate(90deg)',
    },
  },

  commonTypography: {
    title: {
      fontSize: { xs: 11, sm: 12 },
      fontWeight: 600,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '100%',
    },
    subtitle: {
      color: '#717171',
      fontSize: { xs: 13, sm: 14 },
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '100%',
    },
  },
} as const;
