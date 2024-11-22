import type { SxProps, Theme } from '@mui/material/styles';

export const styles: Record<string, SxProps<Theme>> = {
  favoriteIconStyle: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    padding: '4px',
    fontSize: '32px',
  },
};
