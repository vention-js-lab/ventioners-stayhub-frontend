import { type MuiStylesObject } from '#/types/mui-styles-object.type';
import { GRAY_OVERLAY_COLOR } from '../../constants/colors.constant';

export const categoryStyles = {
  categoryItemContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    paddingX: {
      md: 3,
      xs: 1.5,
    },
    color: 'gray',
    paddingY: 2,
    textAlign: 'center',
    borderBottom: '2px solid transparent',
    '&:hover': {
      backgroundColor: GRAY_OVERLAY_COLOR,
      color: 'black',
      cursor: 'pointer',
    },
  },
  iconBox: {
    textAlign: 'center',
    mb: 1,
  },
  activeItem: {
    borderBottomColor: 'black',
    color: 'black',
  },
} satisfies MuiStylesObject;
