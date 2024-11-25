import { type MuiStylesObject } from '#/types/mui-styles-object.type';
import { type Theme } from '@mui/material';

export const imageUploadStyles = {
  container: {
    padding: (theme: Theme) => theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '32px auto',
  },
  title: {
    marginBottom: (theme: Theme) => theme.spacing(4),
    color: (theme: Theme) => theme.palette.text.primary,
  },
  imageUploadSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: (theme: Theme) => theme.spacing(3),
  },
  uploadButton: {
    margin: (theme: Theme) => theme.spacing(2, 0),
    '&:hover': {
      backgroundColor: (theme: Theme) => theme.palette.primary.dark,
    },
    '&.Mui-disabled': {
      backgroundColor: (theme: Theme) => theme.palette.action.disabledBackground,
      color: (theme: Theme) => theme.palette.action.disabled,
    },
  },
  imageCount: {
    marginTop: (theme: Theme) => theme.spacing(1),
    color: (theme: Theme) => theme.palette.text.secondary,
  },
  imageCountError: {
    color: (theme: Theme) => theme.palette.error.main,
  },
  imageList: {
    width: '100%',
    marginTop: (theme: Theme) => theme.spacing(3),
    gap: (theme: Theme) => theme.spacing(2),
  },
  imageItem: {
    position: 'relative',
    borderRadius: (theme: Theme) => theme.shape.borderRadius,
    overflow: 'hidden',
    '&:hover': {
      '& .deleteButton': {
        opacity: 1,
      },
    },
  },
  image: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    opacity: 0,
    transition: 'opacity 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
  },
  hiddenInput: {
    display: 'none',
  },
} satisfies MuiStylesObject;
