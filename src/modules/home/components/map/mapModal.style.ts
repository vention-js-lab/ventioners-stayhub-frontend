import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const mapModalStyles = {
  Button: {
    position: 'fixed',
    height: 35,
    padding: 2,
    width: 'auto',
    borderRadius: 10,
    bottom: 57,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
    backgroundColor: '#000',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#333',
    },
    '& .MuiButton-endIcon': {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  MapIcon: {
    fontSize: 25,
  },
  Dialog: {
    '& .MuiPaper-root': {
      width: '90%',
      height: '90%',
      margin: 0,
      borderRadius: 3,
      boxShadow: 'none',
      overflow: 'hidden',
    },
  },
  IconButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1000,
    color: 'black',
  },
  DialogContent: {
    padding: 0,
    height: '100%',
    width: '100%',
    display: 'flex',
  },
} satisfies MuiStylesObject;
