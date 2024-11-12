import { type MuiStylesObject } from '#/types/mui-styles-object.type';
import { GRAY_OVERLAY_COLOR } from '../../constants/colors.constant';

export const categoryStyles = {
  categoryItemContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingX: 4,
    color: 'gray',
    paddingY: 2,
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
    borderBottom: '2px solid black',
    pb: 1,
    color: 'black',
  },
} satisfies MuiStylesObject;
