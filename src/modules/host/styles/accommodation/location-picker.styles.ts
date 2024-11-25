import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const locationPickerStyles = {
  container: {
    maxWidth: 800,
    margin: '0 auto',
    padding: '40px 24px',
  },
  title: {
    marginBottom: '32px',
    fontWeight: 600,
    color: '#222222',
  },
  searchContainer: {
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px',
    borderRadius: '12px',
    border: '1px solid #DDDDDD',
    transition: 'all 0.2s ease',
    backgroundColor: '#FFF',
    '&:hover': {
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    '&:focus-within': {
      borderColor: '#000',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
  },
  searchInput: {
    '& .MuiInputBase-input': {
      fontSize: '16px',
      color: '#222222',
      '&::placeholder': {
        color: '#717171',
      },
    },
  },
  searchIcon: {
    color: '#FF385C',
    cursor: 'pointer',
    padding: '8px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#FFF8F9',
    },
  },
  selectedLocation: {
    padding: '16px',
    backgroundColor: '#F7F7F7',
    borderRadius: '8px',
    marginBottom: '24px',
  },
  mapContainer: {
    container: {
      height: '500px',
      width: '100%',
      marginBottom: '24px',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid #DDDDDD',
    },
    center: { lat: 51.505, long: -0.09 },
    zoom: 13,
    style: { height: '100%', width: '100%' },
  },
  helpText: {
    color: '#717171',
  },
} satisfies MuiStylesObject;
